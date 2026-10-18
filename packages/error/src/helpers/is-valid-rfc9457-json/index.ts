/**
 * Validates whether an arbitrary value conforms to the minimum RFC 9457 Problem Details JSON structure.
 *
 * Verifies that the input is a non-null object containing the required properties: `type`, `title`, `status`, and `detail`.
 *
 * @param data - The value to test.
 * @returns `true` if `data` contains all required RFC 9457 Problem Details fields, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { isValidRFC9457Json } from "@fastify-utils/error"
 *
 * if (isValidRFC9457Json(response.body)) {
 *     console.log(response.body.title, response.body.status)
 * }
 * ```
 */
export const isValidRFC9457Json = (data: unknown): boolean => {
    if (!data || typeof data !== "object") {
        return false
    }

    const obj = data as Record<string, unknown>

    return "type" in obj && "title" in obj && "status" in obj && "detail" in obj
}
