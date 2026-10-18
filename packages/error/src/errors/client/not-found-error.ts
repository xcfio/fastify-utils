import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 404 Not Found error.
 *
 * Indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
 *
 * @example
 * ```typescript
 * // Auto-formatted message: "User 123 not found"
 * throw new NotFoundError("User", "123")
 *
 * // Custom detail message
 * throw new NotFoundError("Requested page does not exist")
 * ```
 */
export class NotFoundError extends HttpError {
    /**
     * Creates a new instance of {@link NotFoundError}.
     *
     * @param resourceOrDetail - Resource name (e.g. `"User"`) when `id` is provided, or a custom error message/value.
     * @param id - Optional identifier of the resource that was not found. When provided, formats detail as `"<resource> <id> not found"`.
     */
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
