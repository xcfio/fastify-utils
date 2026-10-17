import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class PayloadTooLargeError extends HttpError {
    public readonly maxSize?: number

    constructor(detail: unknown, maxSize?: number) {
        super({
            type: getErrorType("payload-too-large"),
            title: "Payload Too Large",
            status: 413,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "PayloadTooLargeError"
        this.maxSize = maxSize
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.maxSize !== undefined && { maxSize: this.maxSize })
        }
    }
}
