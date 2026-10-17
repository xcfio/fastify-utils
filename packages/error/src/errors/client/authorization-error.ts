import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class AuthorizationError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("authorization"),
            title: "Forbidden",
            status: 403,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "AuthorizationError"
    }
}
