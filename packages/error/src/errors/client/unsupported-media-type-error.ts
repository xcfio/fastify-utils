import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class UnsupportedMediaTypeError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("unsupported-media-type"),
            title: "Unsupported Media Type",
            status: 415,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UnsupportedMediaTypeError"
    }
}
