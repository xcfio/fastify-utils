import { HttpError } from "../../core"
import { extractCause, getErrorType, normalizeToString } from "../../helpers"

/**
 * RFC 9457 HTTP 426 Upgrade Required error.
 *
 * Indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
 *
 * @example
 * ```typescript
 * throw new UpgradeRequiredError("Upgrade to TLS/1.3 required")
 * ```
 */
export class UpgradeRequiredError extends HttpError {
    /**
     * Creates a new instance of {@link UpgradeRequiredError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining which protocol upgrade is required.
     */
    constructor(detail: unknown) {
        super({
            type: getErrorType("upgrade-required"),
            title: "Upgrade Required",
            status: 426,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "UpgradeRequiredError"
    }
}
