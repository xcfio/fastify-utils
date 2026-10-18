import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 508 Loop Detected error (WebDAV / RFC 5842).
 *
 * Indicates that the server terminated an operation because it encountered an infinite loop while processing a request with "Depth: infinity".
 *
 * @example
 * ```typescript
 * throw new LoopDetectedError("Circular dependency detected during operation")
 * ```
 */
export class LoopDetectedError extends HttpError {
    /**
     * Creates a new instance of {@link LoopDetectedError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the detected loop.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("loop-detected"),
            title: "Loop Detected",
            status: 508,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "LoopDetectedError"
    }
}
