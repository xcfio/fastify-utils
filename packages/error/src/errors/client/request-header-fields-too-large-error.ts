import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class RequestHeaderFieldsTooLargeError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("request-header-fields-too-large"),
            title: "Request Header Fields Too Large",
            status: 431,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RequestHeaderFieldsTooLargeError"
    }
}
