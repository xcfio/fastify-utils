import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 505 HTTP Version Not Supported error.
 *
 * Indicates that the server does not support, or refuses to support, the major version of HTTP that was used in the request message.
 *
 * @example
 * ```typescript
 * throw new HttpVersionNotSupportedError("HTTP/2 or HTTP/3 required")
 * ```
 */
export class HttpVersionNotSupportedError extends HttpError {
    /**
     * Creates a new instance of {@link HttpVersionNotSupportedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the HTTP version is unsupported.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("http-version-not-supported"),
            title: "HTTP Version Not Supported",
            status: 505,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "HttpVersionNotSupportedError"
    }
}
