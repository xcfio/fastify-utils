import type { HttpErrorParams } from "../types/index"

/**
 * Base class for all RFC 9457 Problem Details HTTP errors.
 *
 * Implements standard properties defined by RFC 9457 (obsoleting RFC 7807):
 * - `type`: A URI reference identifying the problem type.
 * - `title`: A short human-readable summary.
 * - `status`: The HTTP status code.
 * - `detail`: A human-readable explanation of the specific occurrence.
 * - `instance`: An optional URI identifying the specific error instance.
 *
 * @example
 * ```typescript
 * throw new HttpError({
 *     type: "about:blank#not-found",
 *     title: "Not Found",
 *     status: 404,
 *     detail: "User 42 not found"
 * })
 * ```
 */
export class HttpError extends Error {
    /**
     * A URI reference that identifies the problem type according to RFC 9457.
     */
    public readonly type: string
    /**
     * A short, human-readable summary of the problem type according to RFC 9457.
     */
    public readonly title: string
    /**
     * The HTTP status code for this problem occurrence.
     */
    public readonly status: number
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    public readonly detail: string
    /**
     * An optional URI reference identifying the specific occurrence of the problem.
     */
    public readonly instance?: string

    /**
     * Creates a new instance of {@link HttpError}.
     *
     * @param params - Construction parameters specifying type, title, status, detail, instance, and optional cause.
     */
    constructor(params: HttpErrorParams) {
        super(params.detail, { cause: params.cause })
        this.name = "HttpError"
        this.type = params.type
        this.title = params.title
        this.status = params.status
        this.detail = params.detail
        this.instance = params.instance

        Error.captureStackTrace(this, this.constructor)
    }

    /**
     * Serializes this error into an RFC 9457 compliant plain JSON object.
     *
     * @returns An RFC 9457 Problem Details object containing `type`, `title`, `status`, `detail`, and optional `instance`.
     *
     * @example
     * ```typescript
     * const json = error.toJSON()
     * // {
     * //   type: "about:blank#not-found",
     * //   title: "Not Found",
     * //   status: 404,
     * //   detail: "User 42 not found"
     * // }
     * ```
     */
    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            title: this.title,
            status: this.status,
            detail: this.detail,
            ...(this.instance && { instance: this.instance })
        }
    }
}
