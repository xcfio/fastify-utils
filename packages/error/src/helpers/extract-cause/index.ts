/**
 * Safely extracts an `Error` instance from an unknown error value to use as the `cause`.
 *
 * @param value - Any value passed as error detail.
 * @returns The value itself if it is an instance of `Error`, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * import { extractCause } from "@fastify-utils/error/helpers"
 *
 * const cause = extractCause(new Error("original failure")) // Error: original failure
 * const none = extractCause("just a string") // undefined
 * ```
 */
export function extractCause(value: unknown): Error | undefined {
    if (value instanceof Error) {
        return value
    }

    return undefined
}
