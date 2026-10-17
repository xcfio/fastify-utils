import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

export class NotFoundError extends HttpError {
    constructor(resourceOrDetail: unknown, id?: string) {
        let detail: string

        if (id === undefined) {
            detail = normalizeToString(resourceOrDetail)
        } else {
            detail = `${String(resourceOrDetail)} ${id} not found`
        }

        super({
            type: getErrorType("not-found"),
            title: "Not Found",
            status: 404,
            detail,
            cause: id === undefined ? extractCause(resourceOrDetail) : undefined
        })
        this.name = "NotFoundError"
    }
}
