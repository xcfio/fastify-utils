import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class UriTooLongError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("uri-too-long"),
            title: "URI Too Long",
            status: 414,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UriTooLongError"
    }
}
