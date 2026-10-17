import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class LoopDetectedError extends HttpError {
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
