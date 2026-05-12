import { SchemaErrorFormatter } from "fastify/types/schema"
import { CreateError } from "./create-error"
import { Type, Static } from "typebox"

/**
 * TypeBox schema defining the structure of a single validation error item.
 * Represents an individual schema validation failure, detailing the field path,
 * a human-readable message, the AJV keyword that failed, and optionally the received value.
 */
export const ValidationErrorItem = Type.Object({
    field: Type.String({ description: "Dot-notation field path (e.g. address.zip)" }),
    message: Type.String({ description: "Human-readable error message" }),
    keyword: Type.String({ description: "AJV keyword that triggered the error" }),
    received: Type.Optional(Type.Unknown({ description: "The value that failed validation" }))
})

/**
 * TypeBox schema for a standard HTTP 400 Bad Request response caused by schema validation failure.
 * This schema enforces a consistent error payload structure, which includes:
 * - A specific error `code` (`SCHEMA_VALIDATION_ERROR`)
 * - A general summary `message`
 * - An array of detailed `errors` matching {@link ValidationErrorItem}
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
    message: Type.String({ examples: ["Validation failed for body"] }),
    errors: Type.Array(ValidationErrorItem)
})

/**
 * Formats AJV schema validation errors into a structured, developer-friendly
 * error response using {@link CreateError}.
 *
 * Handles `const` keyword errors by aggregating allowed values into a
 * readable message. Strips `anyOf` wrapper errors to reduce noise.
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
 * //   "message": "Validation failed for body",
 * //   "errors": [
 * //     { "field": "email", "message": "must be string", "keyword": "type", "received": 123 },
 * //     { "field": "address.zip", "message": "must match pattern", "keyword": "pattern", "received": "abcd" }
 * //   ]
 * // }
 */
export function ValidationErrorHandler(
    errors: Parameters<SchemaErrorFormatter>["0"],
    dataVar: Parameters<SchemaErrorFormatter>["1"]
) {
    const path = typeof dataVar === "string" ? dataVar : "unknown"
    const ajvErrors = errors as unknown as AjvErrorObject[]

    const errorItems: Array<Static<typeof ValidationErrorItem>> = []
    const constErrorsByPath: Record<string, AjvErrorObject[]> = {}

    for (const error of ajvErrors) {
        if (error.keyword === "anyOf") continue

        const instancePath = error.instancePath ?? ""
        const field = instancePath.replace(/^\//, "").replace(/\//g, ".") || "root"

        if (error.keyword === "const") {
            if (!constErrorsByPath[field]) constErrorsByPath[field] = []
            constErrorsByPath[field].push(error)
            continue
        }

        errorItems.push({
            field,
            message: error.message ?? "Invalid value",
            keyword: error.keyword,
            received: error.data
        })
    }

    for (const [field, constErrors] of Object.entries(constErrorsByPath)) {
        const allowedValues = constErrors
            .map((e) => e.params?.allowedValue)
            .filter((v) => v !== undefined && v !== null)

        errorItems.push({
            field,
            message:
                allowedValues.length > 0
                    ? `must be one of: ${allowedValues.join(", ")}`
                    : (constErrors[0]?.message ?? "Invalid value"),
            keyword: "const",
            received: constErrors[0]?.data
        })
    }

    return CreateError(400, "SCHEMA_VALIDATION_ERROR", `Validation failed for ${path}`, {
        errors: errorItems
    })
}

/**
 * Internal type representing an AJV validation error object.
 * Used to safely cast Fastify's generic schema error type in order to access
 * AJV-specific properties (e.g., `instancePath`, `params`, `schemaPath`).
 */
type AjvErrorObject = {
    instancePath: string
    keyword: string
    message?: string
    params?: Record<string, unknown>
    schemaPath: string
    data?: unknown
}
