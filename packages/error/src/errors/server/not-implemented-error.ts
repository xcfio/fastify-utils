import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class NotImplementedError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-implemented"),
            title: "Not Implemented",
            status: 501,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotImplementedError"
    }
}
