import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 510 Not Extended error (RFC 2774).
 *
 * Indicates that further extensions to the request are required for the server to fulfill it.
 *
 * @example
 * ```typescript
 * throw new NotExtendedError("Required protocol extension is not present in request")
 * ```
 */
export class NotExtendedError extends HttpError {
    /**
     * Creates a new instance of {@link NotExtendedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why extensions are required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-extended"),
            title: "Not Extended",
            status: 510,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotExtendedError"
    }
}
