import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 412 Precondition Failed error.
 *
 * Indicates that one or more conditions given in the request header fields evaluated to false when tested on the server.
 *
 * @example
 * ```typescript
 * throw new PreconditionFailedError("ETag condition evaluated to false")
 * ```
 */
export class PreconditionFailedError extends HttpError {
    /**
     * Creates a new instance of {@link PreconditionFailedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining which precondition failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("precondition-failed"),
            title: "Precondition Failed",
            status: 412,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "PreconditionFailedError"
    }
}
