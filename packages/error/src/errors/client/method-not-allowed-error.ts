import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 405 Method Not Allowed error.
 *
 * Indicates that the method received in the request-line is known by the origin server but not supported by the target resource.
 *
 * @example
 * ```typescript
 * throw new MethodNotAllowedError("POST is not supported for this endpoint")
 * ```
 */
export class MethodNotAllowedError extends HttpError {
    /**
     * Creates a new instance of {@link MethodNotAllowedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the method is not allowed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("method-not-allowed"),
            title: "Method Not Allowed",
            status: 405,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "MethodNotAllowedError"
    }
}
