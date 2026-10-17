import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class LengthRequiredError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("length-required"),
            title: "Length Required",
            status: 411,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "LengthRequiredError"
    }
}
