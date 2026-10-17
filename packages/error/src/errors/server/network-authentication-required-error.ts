import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class NetworkAuthenticationRequiredError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("network-authentication-required"),
            title: "Network Authentication Required",
            status: 511,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "NetworkAuthenticationRequiredError"
    }
}
