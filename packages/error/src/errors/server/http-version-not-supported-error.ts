import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class HttpVersionNotSupportedError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("http-version-not-supported"),
            title: "HTTP Version Not Supported",
            status: 505,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "HttpVersionNotSupportedError"
    }
}
