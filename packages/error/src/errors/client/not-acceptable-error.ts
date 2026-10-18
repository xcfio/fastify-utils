import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 406 Not Acceptable error.
 *
 * Indicates that the target resource does not have a current representation that would be acceptable according to the proactive negotiation header fields.
 *
 * @example
 * ```typescript
 * throw new NotAcceptableError("Only application/json is supported")
 * ```
 */
export class NotAcceptableError extends HttpError {
    /**
     * Creates a new instance of {@link NotAcceptableError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why content negotiation failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-acceptable"),
            title: "Not Acceptable",
            status: 406,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotAcceptableError"
    }
}
