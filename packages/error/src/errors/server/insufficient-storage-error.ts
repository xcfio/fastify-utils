import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class InsufficientStorageError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("insufficient-storage"),
            title: "Insufficient Storage",
            status: 507,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "InsufficientStorageError"
    }
}
