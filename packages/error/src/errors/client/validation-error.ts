import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"
import type { ValidationErrors } from "../../types/index"

export class ValidationError extends HttpError {
    public readonly validationErrors?: ValidationErrors

    constructor(detail: unknown, validationErrors?: ValidationErrors) {
        super({
            type: getErrorType("validation"),
            title: "Validation Error",
            status: 422,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ValidationError"
        this.validationErrors = validationErrors
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.validationErrors && { validationErrors: this.validationErrors })
        }
    }
}
