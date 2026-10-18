import * as ErrorClasses from "./index"

/**
 * Standard factory methods for creating HTTP 5xx server errors.
 */
const standardFactories = {
    /** HTTP 500 Internal Server Error */
    internal: (detail: unknown) => new ErrorClasses.InternalServerError(detail),
    /** HTTP 501 Not Implemented */
    notImplemented: (detail: unknown) => new ErrorClasses.NotImplementedError(detail),
    /** HTTP 502 Bad Gateway */
    badGateway: (detail: unknown, service?: string) => new ErrorClasses.BadGatewayError(detail, service),
    /** HTTP 503 Service Unavailable */
    serviceUnavailable: (detail: unknown, retryAfter?: number) =>
        new ErrorClasses.ServiceUnavailableError(detail, retryAfter),
    /** HTTP 504 Gateway Timeout */
    gatewayTimeout: (detail: unknown, service?: string) => new ErrorClasses.GatewayTimeoutError(detail, service),
    /** HTTP 505 HTTP Version Not Supported */
    httpVersionNotSupported: (detail: unknown) => new ErrorClasses.HttpVersionNotSupportedError(detail),
    /** HTTP 506 Variant Also Negotiates */
    variantAlsoNegotiates: (detail: unknown) => new ErrorClasses.VariantAlsoNegotiatesError(detail),
    /** HTTP 507 Insufficient Storage */
    insufficientStorage: (detail: unknown) => new ErrorClasses.InsufficientStorageError(detail),
    /** HTTP 508 Loop Detected */
    loopDetected: (detail: unknown) => new ErrorClasses.LoopDetectedError(detail),
    /** HTTP 510 Not Extended */
    notExtended: (detail: unknown) => new ErrorClasses.NotExtendedError(detail),
    /** HTTP 511 Network Authentication Required */
    networkAuthenticationRequired: (detail: unknown) => new ErrorClasses.NetworkAuthenticationRequiredError(detail)
}

/**
 * Convenient aliases for commonly used server error factories.
 */
const aliases = {
    /** Alias for `serviceUnavailable` (HTTP 503) for database errors */
    db: (detail: unknown) => standardFactories.serviceUnavailable(detail),
    /** Alias for `badGateway` (HTTP 502) for external fetch/API errors */
    fetch: (detail: unknown, service?: string) => standardFactories.badGateway(detail, service),
    /** Alias for `notImplemented` (HTTP 501) for missing environment variables */
    envNotSet: (detail: unknown) => standardFactories.notImplemented(detail),
    /** Alias for `notImplemented` (HTTP 501) for invalid environment variables */
    envInvalid: (detail: unknown) => standardFactories.notImplemented(detail),
    /** Alias for `serviceUnavailable` (HTTP 503) for maintenance mode */
    maintenance: (detail: unknown, retryAfter?: number) => standardFactories.serviceUnavailable(detail, retryAfter),
    /** Alias for `insufficientStorage` (HTTP 507) for migration storage failures */
    migration: (detail: unknown) => standardFactories.insufficientStorage(detail),
    /** Alias for `internal` (HTTP 500) for unhandled promise rejections */
    unhandledRejection: (detail: unknown) => standardFactories.internal(detail),
    /** Alias for `internal` (HTTP 500) for uncaught process exceptions */
    uncaughtException: (detail: unknown) => standardFactories.internal(detail)
}

/**
 * Factory functions and aliases for constructing RFC 9457 server errors (5xx).
 *
 * @example
 * ```typescript
 * import { errors } from "@fastify-utils/error"
 *
 * throw errors.server.internal(new Error("Unexpected failure"))
 * throw errors.server.db("Connection pool exhausted")
 * throw errors.server.badGateway("Upstream failed", "PaymentProvider")
 * throw errors.server.maintenance("Scheduled maintenance", 3600)
 * ```
 */
export const factories = {
    ...standardFactories,
    ...aliases
}
