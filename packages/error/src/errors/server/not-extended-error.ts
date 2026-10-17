import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class NotExtendedError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("not-extended"),
            title: "Not Extended",
            status: 510,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NotExtendedError"
    }
}
