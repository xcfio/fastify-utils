import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 502 Bad Gateway error.
 *
 * Indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.
 *
 * @example
 * ```typescript
 * throw new BadGatewayError("External payment gateway returned 500", "Stripe")
 * ```
 */
export class BadGatewayError extends HttpError {
    /**
     * The upstream service or provider name that failed, if known.
     */
    public readonly service?: string

    /**
     * Creates a new instance of {@link BadGatewayError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the failure.
     * @param service - Optional name of the upstream service or provider that failed.
     */
    constructor(detail: unknown, service?: string) {
        super({
            type: getErrorType("bad-gateway"),
            title: "Bad Gateway",
            status: 502,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "BadGatewayError"
        this.service = service
    }

    /**
     * Serializes the error to a JSON object, including `service` when defined.
     *
     * @returns An RFC 9457 Problem Details object with optional `service`.
     */
    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.service && { service: this.service })
        }
    }
}
