import { SchemaErrorFormatter } from "fastify/types/schema"
import { CreateError } from "./create-error"
import { Type } from "typebox"

/**
 * TypeBox schema for a standard HTTP 400 Bad Request response caused by schema validation failure.
 * Enforces a consistent error payload structure containing:
 * - A specific error `code` (`SCHEMA_VALIDATION_ERROR`)
 * - A human-readable `message` with field-level detail
 * - A numeric `statusCode` of `400`
 * - A string `error` label (`"Bad Request"`)
 *
 * @example
 * ```typescript
 * fastify.route({
 *   method: 'POST',
 *   url: '/',
 *   schema: {
 *     response: { 400: ValidationErrorResponse }
 *   },
 *   handler: async (request, reply) => { ... }
 * })
 * ```
 */
export const ValidationErrorResponse = Type.Object({
    code: Type.Literal("SCHEMA_VALIDATION_ERROR"),
    message: Type.String({ examples: ["Schema validation failed for body: email: must be string"] }),
    statusCode: Type.Literal(400),
    error: Type.String({ examples: ["Bad Request"] })
})

/**
 * Represents a single schema validation error produced by AJV.
 *
 * @example
 * ```typescript
 * const err: SchemaValidationError = {
 *   keyword: "type",
 *   message: "must be string",
 *   instancePath: "/email"
 * }
 * ```
 */
export interface SchemaValidationError {
    instancePath?: string
    keyword: string
    message?: string
    params?: {
        allowedValue?: any
        [key: string]: any
    }
}

/**
 * Maps instance paths (e.g. `/email`, `/address`) to their corresponding AJV validation errors.
 * Used internally to group errors before formatting them into a single message string.
 *
 * @example
 * ```typescript
 * const byPath: ErrorsByPath = {
 *   "/email": [{ keyword: "type", message: "must be string" }],
 *   "/role":  [{ keyword: "const", params: { allowedValue: "admin" } }]
 * }
 * ```
 */
export interface ErrorsByPath {
    [key: string]: SchemaValidationError[]
}

/**
 * Formats AJV schema validation errors into a structured, developer-friendly
 * error response using {@link CreateError}.
 *
 * Handles `const` keyword errors by aggregating allowed values into a
 * readable "must be one of: ..." message. Strips `anyOf` wrapper errors
 * to reduce noise. Groups all remaining errors by field path and joins
 * them into a single semicolon-separated message string.
 *
 * @param errors - AJV error objects from Fastify's schema validation.
 * @param dataVar - The data variable name (e.g. `body`, `querystring`).
 * @returns A structured 400 error with code `SCHEMA_VALIDATION_ERROR`.
 *
 * @example
 * ```typescript
 * fastify.setSchemaErrorFormatter(ValidationErrorHandler)
 * ```
 *
 * @example
 * // Response shape:
 * // {
 * //   "code": "SCHEMA_VALIDATION_ERROR",
 * //   "statusCode": 400,
 * //   "error": "Bad Request",
 * //   "message": "Schema validation failed for body: email: must be string; role must be one of: admin, user"
 * // }
 */
export function ValidationErrorHandler(
    errors: Parameters<SchemaErrorFormatter>["0"],
    dataVar: Parameters<SchemaErrorFormatter>["1"]
) {
    const path = typeof dataVar === "string" ? dataVar : "unknown"

    const errorsByPath: ErrorsByPath = {}

    errors.forEach((error) => {
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
            const allowedValues = constErrors.map((e) => e.params?.allowedValue).filter(Boolean)
            if (allowedValues.length > 0) {
                const fieldName = instancePath.replace(/^\//, "") || "root"
                errorMessages.push(`${fieldName} must be one of: ${allowedValues.join(", ")}`)
            } else {
                errorMessages.push(
                    ...constErrors.map(
                        (e) => `${instancePath.replace(/^\//, "") || "root"}: ${e.message ?? "Invalid value"}`
                    )
                )
            }
        }

        if (otherErrors.length > 0) {
            errorMessages.push(
                ...otherErrors.map((e) => {
                    const fieldName = instancePath.replace(/^\//, "") || "root"
                    return `${fieldName}: ${e.message ?? "Invalid value"}`
                })
            )
        }

        if (constErrors.length === 0 && otherErrors.length === 0) {
            errorMessages.push(...pathErrors.map((e) => e.message ?? "Unknown error"))
        }
    })

    const finalMessage = errorMessages.length > 0 ? errorMessages.join("; ") : "Validation failed"

    return CreateError(400, "SCHEMA_VALIDATION_ERROR", `Schema validation failed for ${path}: ${finalMessage}`)
}
