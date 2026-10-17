import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class AuthenticationError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("authentication"),
            title: "Authentication Required",
            status: 401,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "AuthenticationError"
    }
}
