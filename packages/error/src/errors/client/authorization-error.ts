import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 403 Forbidden / Authorization Required error.
 *
 * Indicates that the server understood the request but refuses to authorize it due to insufficient permissions.
 *
 * @example
 * ```typescript
 * throw new AuthorizationError("Admin access required")
 * ```
 */
export class AuthorizationError extends HttpError {
    /**
     * Creates a new instance of {@link AuthorizationError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why authorization was refused.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("authorization"),
            title: "Forbidden",
            status: 403,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "AuthorizationError"
    }
}
