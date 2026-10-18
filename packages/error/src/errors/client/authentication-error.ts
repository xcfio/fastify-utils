import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 401 Unauthorized / Authentication Required error.
 *
 * Indicates that the request lacks valid authentication credentials for the target resource.
 *
 * @example
 * ```typescript
 * throw new AuthenticationError("Invalid or expired token")
 * ```
 */
export class AuthenticationError extends HttpError {
    /**
     * Creates a new instance of {@link AuthenticationError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why authentication failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("authentication"),
            title: "Authentication Required",
            status: 401,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "AuthenticationError"
    }
}
