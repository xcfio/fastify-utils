import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class ServiceUnavailableError extends HttpError {
    public readonly retryAfter?: number

    constructor(detail: unknown, retryAfter?: number) {
        super({
            type: getErrorType("service-unavailable"),
            title: "Service Unavailable",
            status: 503,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ServiceUnavailableError"
        this.retryAfter = retryAfter
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.retryAfter !== undefined && { retryAfter: this.retryAfter })
        }
    }
}
