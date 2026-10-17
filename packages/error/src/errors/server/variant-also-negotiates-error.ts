import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class VariantAlsoNegotiatesError extends HttpError {
    constructor(detail: unknown) {
        super({
            type: getErrorType("variant-also-negotiates"),
            title: "Variant Also Negotiates",
            status: 506,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "VariantAlsoNegotiatesError"
    }
}
