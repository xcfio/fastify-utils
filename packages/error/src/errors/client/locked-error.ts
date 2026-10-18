import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 423 Locked error (WebDAV / RFC 4918).
 *
 * Indicates that the source or destination resource of a method is locked.
 *
 * @example
 * ```typescript
 * throw new LockedError("Document is currently locked by another user")
 * ```
 */
export class LockedError extends HttpError {
    /**
     * Creates a new instance of {@link LockedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the resource is locked.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("locked"),
            title: "Locked",
            status: 423,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "LockedError"
    }
}
