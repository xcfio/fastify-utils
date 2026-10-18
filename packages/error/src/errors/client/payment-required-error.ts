import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 402 Payment Required error.
 *
 * Reserved for digital payment systems; indicates that payment is required to proceed with the request.
 *
 * @example
 * ```typescript
 * throw new PaymentRequiredError("Active subscription required to access this resource")
 * ```
 */
export class PaymentRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link PaymentRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining why payment is required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("payment-required"),
            title: "Payment Required",
            status: 402,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "PaymentRequiredError"
    }
}
