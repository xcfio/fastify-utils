import type { SchemaErrorFormatter } from "fastify/types/schema"
import type { ErrorsByPath } from "../../types"
import { errors } from "@fastify-utils/error"

/**
 * Formats AJV schema validation errors into a structured, developer-friendly
 * RFC 9457 Problem Details error response using `@fastify-utils/error`.
 *
 * Handles `const` keyword errors by aggregating allowed values into a
 * readable "must be one of: ..." message. Strips `anyOf` wrapper errors
 * to reduce noise. Groups all remaining errors by field path and joins
 * them into a single semicolon-separated message string.
 *
 * @param err - AJV error objects from Fastify's schema validation.
 * @param dataVar - The data variable name (e.g. `body`, `querystring`).
 * @returns A structured RFC 9457 `ValidationError` instance with status 422.
 *
 * @example
 * ```typescript
 * const fastify = Fastify({
 *     // ...other options
 *     schemaErrorFormatter
 * })
 * ```
 *
 * @example
 * // Response shape:
 * // {
 * //   "type": "about:blank#validation",
 * //   "title": "Validation Error",
 * //   "status": 422,
 * //   "detail": "Schema validation failed for body: email: must be string; role must be one of: admin, user"
 * // }
 */
export function schemaErrorFormatter(
    err: Parameters<SchemaErrorFormatter>["0"],
    dataVar: Parameters<SchemaErrorFormatter>["1"]
) {
    const path = typeof dataVar === "string" ? dataVar : "unknown"

    const errorsByPath: ErrorsByPath = {}

    err.forEach((error) => {
        const instancePath = error.instancePath ?? "root"
        if (!errorsByPath[instancePath]) {
            errorsByPath[instancePath] = []
        }
        errorsByPath[instancePath].push(error)
    })

    const errorMessages: string[] = []

    Object.entries(errorsByPath).forEach(([instancePath, pathErrors]) => {
        const constErrors = pathErrors.filter((e) => e.keyword === "const")
        const otherErrors = pathErrors.filter((e) => e.keyword !== "const" && e.keyword !== "anyOf")

        if (constErrors.length > 0) {
            // oxlint-disable-next-line typescript/no-unsafe-return
            const allowedValues = constErrors.map((e) => e.params?.allowedValue).filter(Boolean)
            if (allowedValues.length > 0) {
                const fieldName = instancePath.replace(/^\//u, "") || "root"
                errorMessages.push(`${fieldName} must be one of: ${allowedValues.join(", ")}`)
            } else {
                errorMessages.push(
                    ...constErrors.map(
                        (e) => `${instancePath.replace(/^\//u, "") || "root"}: ${e.message ?? "Invalid value"}`
                    )
                )
            }
        }

        if (otherErrors.length > 0) {
            errorMessages.push(
                ...otherErrors.map((e) => {
                    const fieldName = instancePath.replace(/^\//u, "") || "root"
                    return `${fieldName}: ${e.message ?? "Invalid value"}`
                })
            )
        }

        if (constErrors.length === 0 && otherErrors.length === 0) {
            errorMessages.push(...pathErrors.map((e) => e.message ?? "Unknown error"))
        }
    })

    const finalMessage = errorMessages.length > 0 ? errorMessages.join("; ") : "Validation failed"

    return errors.client.validation(`Schema validation failed for ${path}: ${finalMessage}`)
}
