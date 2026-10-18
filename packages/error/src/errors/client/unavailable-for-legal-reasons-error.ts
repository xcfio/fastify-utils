import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 451 Unavailable For Legal Reasons error (RFC 7725).
 *
 * Indicates that the server is denying access to the resource as a consequence of a legal demand.
 *
 * @example
 * ```typescript
 * throw new UnavailableForLegalReasonsError("Access blocked due to court order")
 * ```
 */
export class UnavailableForLegalReasonsError extends HttpError {
    /**
     * Creates a new instance of {@link UnavailableForLegalReasonsError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the legal restriction.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("unavailable-for-legal-reasons"),
            title: "Unavailable For Legal Reasons",
            status: 451,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UnavailableForLegalReasonsError"
    }
}
