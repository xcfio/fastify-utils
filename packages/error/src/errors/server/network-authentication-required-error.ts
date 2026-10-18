import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 511 Network Authentication Required error (RFC 6585).
 *
 * Indicates that the client needs to authenticate to gain network access (e.g. captive portals).
 *
 * @example
 * ```typescript
 * throw new NetworkAuthenticationRequiredError("Captive portal authentication required")
 * ```
 */
export class NetworkAuthenticationRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link NetworkAuthenticationRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why network authentication is required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("network-authentication-required"),
            title: "Network Authentication Required",
            status: 511,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NetworkAuthenticationRequiredError"
    }
}
