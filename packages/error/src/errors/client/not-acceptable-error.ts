import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class NotAcceptableError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-acceptable"),
            title: "Not Acceptable",
            status: 406,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotAcceptableError"
    }
}
