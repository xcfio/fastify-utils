import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 503 Service Unavailable error.
 *
 * Indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance.
 *
 * @example
 * ```typescript
 * throw new ServiceUnavailableError("System under scheduled maintenance", 3600)
 * ```
 */
export class ServiceUnavailableError extends HttpError {
    /**
     * Number of seconds the client should wait before retrying, if known.
     */
    public readonly retryAfter?: number

    /**
     * Creates a new instance of {@link ServiceUnavailableError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the service unavailability.
     * @param retryAfter - Optional number of seconds until the service is expected to be available again.
     */
    constructor(detail: unknown, retryAfter?: number) {
        super({
            type: getErrorType("service-unavailable"),
            title: "Service Unavailable",
            status: 503,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "ServiceUnavailableError"
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
