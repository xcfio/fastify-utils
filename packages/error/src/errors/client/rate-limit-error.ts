import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 429 Too Many Requests error (RFC 6585).
 *
 * Indicates that the user has sent too many requests in a given amount of time ("rate limiting").
 *
 * @example
 * ```typescript
 * throw new RateLimitError("Rate limit exceeded", 60)
 * ```
 */
export class RateLimitError extends HttpError {
    /**
     * Number of seconds the client should wait before making a new request, if known.
     */
    public readonly retryAfter?: number

    /**
     * Creates a new instance of {@link RateLimitError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the rate limit breach.
     * @param retryAfter - Optional number of seconds until the rate limit resets.
     */
    constructor(detail: unknown, retryAfter?: number) {
        super({
            type: getErrorType("rate-limit"),
            title: "Too Many Requests",
            status: 429,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "RateLimitError"
        this.retryAfter = retryAfter
    }

    /**
     * Serializes the error to a JSON object, including `retryAfter` when defined.
     *
     * @returns An RFC 9457 Problem Details object with optional `retryAfter`.
     */
    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.retryAfter !== undefined && { retryAfter: this.retryAfter })
        }
    }
}
