import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 504 Gateway Timeout error.
 *
 * Indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.
 *
 * @example
 * ```typescript
 * throw new GatewayTimeoutError("Payment API timed out after 30s", "Stripe")
 * ```
 */
export class GatewayTimeoutError extends HttpError {
    /**
     * The upstream service or provider that timed out, if known.
     */
    public readonly service?: string

    /**
     * Creates a new instance of {@link GatewayTimeoutError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the timeout.
     * @param service - Optional name of the upstream service or provider that timed out.
     */
    constructor(detail: unknown, service?: string) {
        super({
            type: getErrorType("gateway-timeout"),
            title: "Gateway Timeout",
            status: 504,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "GatewayTimeoutError"
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
