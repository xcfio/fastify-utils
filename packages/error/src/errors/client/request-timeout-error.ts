import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 408 Request Timeout error.
 *
 * Indicates that the server did not receive a complete request message within the time that it was prepared to wait.
 *
 * @example
 * ```typescript
 * throw new RequestTimeoutError("Client took too long to send request body")
 * ```
 */
export class RequestTimeoutError extends HttpError {
    /**
     * Creates a new instance of {@link RequestTimeoutError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the timeout.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("request-timeout"),
            title: "Request Timeout",
            status: 408,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RequestTimeoutError"
    }
}
