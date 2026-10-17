import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class MisdirectedRequestError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("misdirected-request"),
            title: "Misdirected Request",
            status: 421,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "MisdirectedRequestError"
    }
}
