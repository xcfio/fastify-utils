import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 407 Proxy Authentication Required error.
 *
 * Indicates that the client must first authenticate itself with the proxy.
 *
 * @example
 * ```typescript
 * throw new ProxyAuthenticationRequiredError("Proxy authentication required to access resource")
 * ```
 */
export class ProxyAuthenticationRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link ProxyAuthenticationRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why proxy authentication failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("proxy-authentication-required"),
            title: "Proxy Authentication Required",
            status: 407,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ProxyAuthenticationRequiredError"
    }
}
