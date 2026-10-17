import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class BadGatewayError extends HttpError {
    public readonly service?: string

    constructor(detail: unknown, service?: string) {
        super({
            type: getErrorType("bad-gateway"),
            title: "Bad Gateway",
            status: 502,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "BadGatewayError"
        this.service = service
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.service && { service: this.service })
        }
    }
}
