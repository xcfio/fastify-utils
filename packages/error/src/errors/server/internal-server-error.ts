import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 500 Internal Server Error.
 *
 * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 *
 * @example
 * ```typescript
 * try {
 *     // dangerous operation
 * } catch (err) {
 *     throw new InternalServerError(err)
 * }
 * ```
 */
export class InternalServerError extends HttpError {
    /**
     * Creates a new instance of {@link InternalServerError}.
     *
     * @param detail - A human-readable description, Error instance, or raw caught error value.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("internal-server-error"),
            title: "Internal Server Error",
            status: 500,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "InternalServerError"
    }
}
