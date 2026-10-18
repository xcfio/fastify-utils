import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 431 Request Header Fields Too Large error (RFC 6585).
 *
 * Indicates that the server is unwilling to process the request because its header fields are too large.
 *
 * @example
 * ```typescript
 * throw new RequestHeaderFieldsTooLargeError("Cookie header exceeds maximum allowed size")
 * ```
 */
export class RequestHeaderFieldsTooLargeError extends HttpError {
    /**
     * Creates a new instance of {@link RequestHeaderFieldsTooLargeError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining that headers exceeded the limit.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("request-header-fields-too-large"),
            title: "Request Header Fields Too Large",
            status: 431,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RequestHeaderFieldsTooLargeError"
    }
}
