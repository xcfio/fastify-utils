import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class ProxyAuthenticationRequiredError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("proxy-authentication-required"),
            title: "Proxy Authentication Required",
            status: 407,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ProxyAuthenticationRequiredError"
    }
}
