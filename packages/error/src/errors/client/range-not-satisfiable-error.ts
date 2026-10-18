import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 416 Range Not Satisfiable error.
 *
 * Indicates that none of the ranges in the request's Range header field overlap the current extent of the selected resource.
 *
 * @example
 * ```typescript
 * throw new RangeNotSatisfiableError("Requested byte range is invalid or out of bounds")
 * ```
 */
export class RangeNotSatisfiableError extends HttpError {
    /**
     * Creates a new instance of {@link RangeNotSatisfiableError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the requested range cannot be satisfied.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("range-not-satisfiable"),
            title: "Range Not Satisfiable",
            status: 416,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RangeNotSatisfiableError"
    }
}
