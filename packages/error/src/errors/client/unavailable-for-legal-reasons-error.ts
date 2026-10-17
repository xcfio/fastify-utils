import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class UnavailableForLegalReasonsError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("unavailable-for-legal-reasons"),
            title: "Unavailable For Legal Reasons",
            status: 451,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UnavailableForLegalReasonsError"
    }
}
