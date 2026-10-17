import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class UpgradeRequiredError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("upgrade-required"),
            title: "Upgrade Required",
            status: 426,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UpgradeRequiredError"
    }
}
