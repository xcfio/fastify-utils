import type { ValidationErrors } from "../../types/index"
import * as ErrorClasses from "./index"

/**
 * Standard factory methods for creating HTTP 4xx client errors.
 */
const standardFactories = {
    /** HTTP 400 Bad Request */
    badRequest: (detail: unknown) => new ErrorClasses.BadRequestError(detail),
    /** HTTP 402 Payment Required */
    paymentRequired: (detail: unknown) => new ErrorClasses.PaymentRequiredError(detail),
    /** HTTP 401 Unauthorized / Authentication Required */
    authentication: (detail: unknown) => new ErrorClasses.AuthenticationError(detail),
    /** HTTP 403 Forbidden / Authorization Required */
    authorization: (detail: unknown) => new ErrorClasses.AuthorizationError(detail),
    /** HTTP 404 Not Found */
    notFound: (resourceOrDetail: unknown, id?: string) => new ErrorClasses.NotFoundError(resourceOrDetail, id),
    /** HTTP 405 Method Not Allowed */
    methodNotAllowed: (detail: unknown) => new ErrorClasses.MethodNotAllowedError(detail),
    /** HTTP 406 Not Acceptable */
    notAcceptable: (detail: unknown) => new ErrorClasses.NotAcceptableError(detail),
    /** HTTP 407 Proxy Authentication Required */
    proxyAuthenticationRequired: (detail: unknown) => new ErrorClasses.ProxyAuthenticationRequiredError(detail),
    /** HTTP 408 Request Timeout */
    requestTimeout: (detail: unknown) => new ErrorClasses.RequestTimeoutError(detail),
    /** HTTP 409 Conflict */
    conflict: (detail: unknown) => new ErrorClasses.ConflictError(detail),
    /** HTTP 410 Gone */
    gone: (detail: unknown) => new ErrorClasses.GoneError(detail),
    /** HTTP 411 Length Required */
    lengthRequired: (detail: unknown) => new ErrorClasses.LengthRequiredError(detail),
    /** HTTP 412 Precondition Failed */
    preconditionFailed: (detail: unknown) => new ErrorClasses.PreconditionFailedError(detail),
    /** HTTP 413 Payload Too Large */
    payloadTooLarge: (detail: unknown, maxSize?: number) => new ErrorClasses.PayloadTooLargeError(detail, maxSize),
    /** HTTP 414 URI Too Long */
    uriTooLong: (detail: unknown) => new ErrorClasses.UriTooLongError(detail),
    /** HTTP 415 Unsupported Media Type */
    unsupportedMediaType: (detail: unknown) => new ErrorClasses.UnsupportedMediaTypeError(detail),
    /** HTTP 416 Range Not Satisfiable */
    rangeNotSatisfiable: (detail: unknown) => new ErrorClasses.RangeNotSatisfiableError(detail),
    /** HTTP 417 Expectation Failed */
    expectationFailed: (detail: unknown) => new ErrorClasses.ExpectationFailedError(detail),
    /** HTTP 421 Misdirected Request */
    misdirectedRequest: (detail: unknown) => new ErrorClasses.MisdirectedRequestError(detail),
    /** HTTP 422 Unprocessable Content / Validation Error */
    validation: (detail: unknown, validationErrors?: ValidationErrors) =>
        new ErrorClasses.ValidationError(detail, validationErrors),
    /** HTTP 423 Locked */
    locked: (detail: unknown) => new ErrorClasses.LockedError(detail),
    /** HTTP 424 Failed Dependency */
    failedDependency: (detail: unknown) => new ErrorClasses.FailedDependencyError(detail),
    /** HTTP 425 Too Early */
    tooEarly: (detail: unknown) => new ErrorClasses.TooEarlyError(detail),
    /** HTTP 426 Upgrade Required */
    upgradeRequired: (detail: unknown) => new ErrorClasses.UpgradeRequiredError(detail),
    /** HTTP 428 Precondition Required */
    preconditionRequired: (detail: unknown) => new ErrorClasses.PreconditionRequiredError(detail),
    /** HTTP 429 Too Many Requests */
    rateLimit: (detail: unknown, retryAfter?: number) => new ErrorClasses.RateLimitError(detail, retryAfter),
    /** HTTP 431 Request Header Fields Too Large */
    requestHeaderFieldsTooLarge: (detail: unknown) => new ErrorClasses.RequestHeaderFieldsTooLargeError(detail),
    /** HTTP 451 Unavailable For Legal Reasons */
    unavailableForLegalReasons: (detail: unknown) => new ErrorClasses.UnavailableForLegalReasonsError(detail)
}

/**
 * Convenient aliases for commonly used client error factories.
 */
const aliases = {
    /** Alias for `validation` (HTTP 422) */
    validate: (detail: unknown, validationErrors?: ValidationErrors) =>
        standardFactories.validation(detail, validationErrors),
    /** Alias for `authorization` (HTTP 403) */
    permission: (detail: unknown) => standardFactories.authorization(detail),
    /** Alias for `authorization` (HTTP 403) */
    access: (detail: unknown) => standardFactories.authorization(detail),
    /** Alias for `notFound` (HTTP 404) */
    idNotFound: (resourceOrDetail: unknown, id?: string) => standardFactories.notFound(resourceOrDetail, id),
    /** Alias for `conflict` (HTTP 409) */
    duplicate: (detail: unknown) => standardFactories.conflict(detail),
    /** Alias for `failedDependency` (HTTP 424) */
    thirdParty: (detail: unknown) => standardFactories.failedDependency(detail)
}

/**
 * Factory functions and aliases for constructing RFC 9457 client errors (4xx).
 *
 * @example
 * ```typescript
 * import { errors } from "@fastify-utils/error"
 *
 * throw errors.client.notFound("User", "123")
 * throw errors.client.validation("Invalid email", { email: ["Invalid format"] })
 * throw errors.client.permission("Admin access required")
 * ```
 */
export const factories = {
    ...standardFactories,
    ...aliases
}
