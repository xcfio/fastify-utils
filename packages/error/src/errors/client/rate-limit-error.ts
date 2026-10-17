import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class RateLimitError extends HttpError {
    public readonly retryAfter?: number

    constructor(detail: unknown, retryAfter?: number) {
        super({
            type: getErrorType("rate-limit"),
            title: "Too Many Requests",
            status: 429,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RateLimitError"
        this.retryAfter = retryAfter
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.retryAfter !== undefined && { retryAfter: this.retryAfter })
        }
    }
}
