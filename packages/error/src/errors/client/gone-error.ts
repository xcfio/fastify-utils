import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 410 Gone error.
 *
 * Indicates that access to the target resource is no longer available at the origin server and that this condition is likely permanent.
 *
 * @example
 * ```typescript
 * throw new GoneError("Resource has been permanently deleted")
 * ```
 */
export class GoneError extends HttpError {
    /**
     * Creates a new instance of {@link GoneError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the resource is gone.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("gone"),
            title: "Gone",
            status: 410,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "GoneError"
    }
}
