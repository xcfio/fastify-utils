import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class BadRequestError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("bad-request"),
            title: "Bad Request",
            status: 400,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "BadRequestError"
    }
}
