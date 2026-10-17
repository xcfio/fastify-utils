import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class TooEarlyError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("too-early"),
            title: "Too Early",
            status: 425,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "TooEarlyError"
    }
}
