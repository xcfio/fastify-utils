import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 417 Expectation Failed error.
 *
 * Indicates that the expectation given in the request's Expect header field could not be met by the server.
 *
 * @example
 * ```typescript
 * throw new ExpectationFailedError("Expectation given in Expect header could not be met")
 * ```
 */
export class ExpectationFailedError extends HttpError {
    /**
     * Creates a new instance of {@link ExpectationFailedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the expectation failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("expectation-failed"),
            title: "Expectation Failed",
            status: 417,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ExpectationFailedError"
    }
}
