import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 507 Insufficient Storage error (WebDAV / RFC 4918).
 *
 * Indicates that the method could not be performed on the resource because the server is unable to store the representation needed to complete the request.
 *
 * @example
 * ```typescript
 * throw new InsufficientStorageError("Disk quota exceeded for database storage")
 * ```
 */
export class InsufficientStorageError extends HttpError {
    /**
     * Creates a new instance of {@link InsufficientStorageError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the storage shortage.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("insufficient-storage"),
            title: "Insufficient Storage",
            status: 507,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "InsufficientStorageError"
    }
}
