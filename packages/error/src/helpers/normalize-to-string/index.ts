/* eslint-disable typescript/no-base-to-string */
/**
 * Normalizes an unknown value into a human-readable string for use in error details.
 *
 * - `Error` instances return `error.message`.
 * - `string` primitives are returned as-is.
 * - `null` / `undefined` return `"Unknown error"`.
 * - Plain objects and arrays are serialized using `JSON.stringify()`, falling back to `String(value)`.
 * - Other primitives are converted via `String(value)`.
 *
 * @param value - The value to normalize.
 * @returns A normalized string representation.
 *
 * @example
 * ```typescript
 * import { normalizeToString } from "@fastify-utils/error/helpers"
 *
 * normalizeToString(new Error("Connection reset")) // "Connection reset"
 * normalizeToString("Custom message") // "Custom message"
 * normalizeToString({ code: 123 }) // '{"code":123}'
 * normalizeToString(null) // "Unknown error"
 * ```
 */
export function normalizeToString(value: unknown): string {
    if (value instanceof Error) {
        return value.message
    }

    if (typeof value === "string") {
        return value
    }

    if (value === null || value === undefined) {
        return "Unknown error"
    }

    if (typeof value === "object") {
        try {
            return JSON.stringify(value)
        } catch {
            return String(value)
        }
    }

    return String(value)
}
