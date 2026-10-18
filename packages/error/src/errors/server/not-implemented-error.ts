import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 501 Not Implemented error.
 *
 * Indicates that the server does not support the functionality required to fulfill the request.
 *
 * @example
 * ```typescript
 * throw new NotImplementedError("OAuth provider login not implemented")
 * ```
 */
export class NotImplementedError extends HttpError {
    /**
     * Creates a new instance of {@link NotImplementedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining which feature is not implemented.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-implemented"),
            title: "Not Implemented",
            status: 501,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotImplementedError"
    }
}
