import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 400 Bad Request error.
 *
 * Indicates that the server cannot or will not process the request due to something perceived to be a client error (e.g. malformed syntax).
 *
 * @example
 * ```typescript
 * throw new BadRequestError("Malformed JSON payload")
 * ```
 */
export class BadRequestError extends HttpError {
    /**
     * Creates a new instance of {@link BadRequestError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining what made the request invalid.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("bad-request"),
            title: "Bad Request",
            status: 400,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "BadRequestError"
    }
}
