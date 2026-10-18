import { HttpError } from "../../core/index"

/**
 * Type guard that checks whether an unknown value is an instance of {@link HttpError}.
 *
 * @param error - The value to test.
 * @returns `true` if `error` is an instance of {@link HttpError}, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { isHttpError } from "@fastify-utils/error"
 *
 * try {
 *     // ...
 * } catch (err) {
 *     if (isHttpError(err)) {
 *         reply.status(err.status).send(err.toJSON())
 *     }
 * }
 * ```
 */
export function isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError
}
