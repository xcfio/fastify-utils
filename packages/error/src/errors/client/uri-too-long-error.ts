import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 414 URI Too Long error.
 *
 * Indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.
 *
 * @example
 * ```typescript
 * throw new UriTooLongError("Request URI exceeds maximum allowed length of 2048 characters")
 * ```
 */
export class UriTooLongError extends HttpError {
    /**
     * Creates a new instance of {@link UriTooLongError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the URI was too long.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("uri-too-long"),
            title: "URI Too Long",
            status: 414,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UriTooLongError"
    }
}
