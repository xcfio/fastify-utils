import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 425 Too Early error (RFC 8470).
 *
 * Indicates that the server is unwilling to risk processing a request that might be replayed (e.g. in TLS early data).
 *
 * @example
 * ```typescript
 * throw new TooEarlyError("Request cannot be processed in early data")
 * ```
 */
export class TooEarlyError extends HttpError {
    /**
     * Creates a new instance of {@link TooEarlyError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the request cannot be processed early.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("too-early"),
            title: "Too Early",
            status: 425,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "TooEarlyError"
    }
}
