import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 411 Length Required error.
 *
 * Indicates that the server refuses to accept the request without a defined Content-Length header.
 *
 * @example
 * ```typescript
 * throw new LengthRequiredError("Content-Length header is required")
 * ```
 */
export class LengthRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link LengthRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why Content-Length is required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("length-required"),
            title: "Length Required",
            status: 411,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "LengthRequiredError"
    }
}
