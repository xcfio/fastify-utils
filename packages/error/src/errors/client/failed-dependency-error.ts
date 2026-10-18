import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 424 Failed Dependency error (WebDAV / RFC 4918).
 *
 * Indicates that the method could not be performed on the resource because the requested action depended on another action and that action failed.
 *
 * @example
 * ```typescript
 * throw new FailedDependencyError("Third-party payment service failed")
 * ```
 */
export class FailedDependencyError extends HttpError {
    /**
     * Creates a new instance of {@link FailedDependencyError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining which dependency failed.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("failed-dependency"),
            title: "Failed Dependency",
            status: 424,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "FailedDependencyError"
    }
}
