import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 506 Variant Also Negotiates error (RFC 2295).
 *
 * Indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
 *
 * @example
 * ```typescript
 * throw new VariantAlsoNegotiatesError("Content negotiation variant configuration error")
 * ```
 */
export class VariantAlsoNegotiatesError extends HttpError {
    /**
     * Creates a new instance of {@link VariantAlsoNegotiatesError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the negotiation error.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("variant-also-negotiates"),
            title: "Variant Also Negotiates",
            status: 506,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "VariantAlsoNegotiatesError"
    }
}
