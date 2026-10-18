import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 421 Misdirected Request error.
 *
 * Indicates that the request was directed at a server that is not able to produce a response.
 *
 * @example
 * ```typescript
 * throw new MisdirectedRequestError("Request directed to inappropriate host")
 * ```
 */
export class MisdirectedRequestError extends HttpError {
    /**
     * Creates a new instance of {@link MisdirectedRequestError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why the request was misdirected.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("misdirected-request"),
            title: "Misdirected Request",
            status: 421,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "MisdirectedRequestError"
    }
}
