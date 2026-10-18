import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 415 Unsupported Media Type error.
 *
 * Indicates that the origin server is refusing to service the request because the payload format is in an unsupported format.
 *
 * @example
 * ```typescript
 * throw new UnsupportedMediaTypeError("Only application/json is supported")
 * ```
 */
export class UnsupportedMediaTypeError extends HttpError {
    /**
     * Creates a new instance of {@link UnsupportedMediaTypeError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the media type is unsupported.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("unsupported-media-type"),
            title: "Unsupported Media Type",
            status: 415,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UnsupportedMediaTypeError"
    }
}
