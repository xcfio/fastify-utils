import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"
import type { ValidationErrors } from "../../types"

/**
 * RFC 9457 HTTP 422 Unprocessable Content / Validation Error.
 *
 * Indicates that the server understands the content type and syntax of the request entity, but was unable to process the contained instructions (e.g. schema or field validation errors).
 *
 * @example
 * ```typescript
 * throw new ValidationError("Validation failed", {
 *     email: ["Invalid email address format"],
 *     password: ["Must be at least 8 characters"]
 * })
 * ```
 */
export class ValidationError extends HttpError {
    /**
     * Optional map of field-level validation errors.
     */
    public readonly validationErrors?: ValidationErrors

    /**
     * Creates a new instance of {@link ValidationError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the validation failure.
     * @param validationErrors - Optional dictionary mapping field paths to arrays of validation error messages.
     */
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

    /**
     * Serializes the error to a JSON object, including `validationErrors` when defined.
     *
     * @returns An RFC 9457 Problem Details object with optional `validationErrors`.
     */
    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.validationErrors && { validationErrors: this.validationErrors })
        }
    }
}
