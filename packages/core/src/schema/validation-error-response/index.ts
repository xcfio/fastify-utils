import { Type } from "typebox"

/**
 * TypeBox schema for an RFC 9457 Problem Details HTTP 422 Unprocessable Entity response caused by schema validation failure.
 * Enforces an RFC 9457 compliant error payload structure containing:
 * - A URI reference `type` identifying the error type (`about:blank#validation`)
 * - A short human-readable summary `title` (`"Validation Error"`)
 * - An HTTP `status` code of `422`
 * - A human-readable `detail` with field-level explanation
 * - An optional `instance` URI reference identifying the specific occurrence
 * - An optional `validationErrors` map containing field-level error messages
 *
 * @example
 * ```typescript
 * fastify.route({
 *   method: 'POST',
 *   url: '/',
 *   schema: {
 *     response: { 422: ValidationErrorResponse }
 *   },
 *   handler: async (request, reply) => { ... }
 * })
 * ```
 */
export const ValidationErrorResponse = Type.Object({
    type: Type.String({ examples: ["about:blank#validation"] }),
    title: Type.String({ examples: ["Validation Error"] }),
    status: Type.Literal(422),
    detail: Type.String({ examples: ["Schema validation failed for body: email: must be string"] }),
    instance: Type.Optional(Type.String({ examples: ["/users"] })),
    validationErrors: Type.Optional(Type.Record(Type.String(), Type.Array(Type.String())))
})
