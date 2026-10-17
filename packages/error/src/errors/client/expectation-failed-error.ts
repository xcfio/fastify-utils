import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class ExpectationFailedError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("expectation-failed"),
            title: "Expectation Failed",
            status: 417,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ExpectationFailedError"
    }
}
