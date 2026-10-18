import { HttpError } from "../../core/index"
import { extractCause, getErrorType, normalizeToString } from "../../helpers/index"

/**
 * RFC 9457 HTTP 413 Payload Too Large error.
 *
 * Indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.
 *
 * @example
 * ```typescript
 * throw new PayloadTooLargeError("File exceeds upload limit", 5242880)
 * ```
 */
export class PayloadTooLargeError extends HttpError {
    /**
     * The maximum permitted payload size in bytes, if applicable.
     */
    public readonly maxSize?: number

    /**
     * Creates a new instance of {@link PayloadTooLargeError}.
     *
     * @param detail - A human-readable description, Error instance, or raw value explaining the payload limit breach.
     * @param maxSize - Optional maximum allowed payload size in bytes.
     */
    constructor(detail: unknown, maxSize?: number) {
        super({
            type: getErrorType("payload-too-large"),
            title: "Payload Too Large",
            status: 413,
            detail: normalizeToString(detail),
            cause: extractCause(detail)
        })
        this.name = "PayloadTooLargeError"
        this.maxSize = maxSize
    }

    /**
     * Serializes the error to a JSON object, including `maxSize` when defined.
     *
     * @returns An RFC 9457 Problem Details object with optional `maxSize`.
     */
    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            ...(this.maxSize !== undefined && { maxSize: this.maxSize })
        }
    }
}
