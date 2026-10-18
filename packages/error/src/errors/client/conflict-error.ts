import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 409 Conflict error.
 *
 * Indicates that the request could not be completed due to a conflict with the current state of the target resource.
 *
 * @example
 * ```typescript
 * throw new ConflictError("User with this email already exists")
 * ```
 */
export class ConflictError extends HttpError {
    /**
     * Creates a new instance of {@link ConflictError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the conflict condition.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("conflict"),
            title: "Conflict",
            status: 409,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ConflictError"
    }
}
