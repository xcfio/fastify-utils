import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 428 Precondition Required error (RFC 6585).
 *
 * Indicates that the origin server requires the request to be conditional to prevent the "lost update" problem.
 *
 * @example
 * ```typescript
 * throw new PreconditionRequiredError("If-Match header is required for updates")
 * ```
 */
export class PreconditionRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link PreconditionRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining which precondition header is required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("precondition-required"),
            title: "Precondition Required",
            status: 428,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "PreconditionRequiredError"
    }
}
