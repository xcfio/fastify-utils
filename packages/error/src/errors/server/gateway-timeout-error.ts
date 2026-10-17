import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class GatewayTimeoutError extends HttpError {
    public readonly service?: string

    constructor(detail: unknown, service?: string) {
        super({
            type: getErrorType("gateway-timeout"),
            title: "Gateway Timeout",
            status: 504,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "GatewayTimeoutError"
        this.service = service
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.service && { service: this.service })
        }
    }
}
