/**
 * Client error classes and factory functions (4xx status codes).
 */
export * as client from "./client/index"
export {
    AuthenticationError,
    AuthorizationError,
    BadRequestError,
    ConflictError,
    ExpectationFailedError,
    FailedDependencyError,
    GoneError,
    LengthRequiredError,
    LockedError,
    MethodNotAllowedError,
    MisdirectedRequestError,
    NotAcceptableError,
    NotFoundError,
    PayloadTooLargeError,
    PaymentRequiredError,
    PreconditionFailedError,
    PreconditionRequiredError,
    ProxyAuthenticationRequiredError,
    RangeNotSatisfiableError,
    RateLimitError,
    RequestHeaderFieldsTooLargeError,
    RequestTimeoutError,
    TooEarlyError,
    UnavailableForLegalReasonsError,
    UnsupportedMediaTypeError,
    UpgradeRequiredError,
    UriTooLongError,
    ValidationError
} from "./client/index"

/**
 * Server error classes and factory functions (5xx status codes).
 */
export * as server from "./server/index"

export {
    BadGatewayError,
    GatewayTimeoutError,
    HttpVersionNotSupportedError,
    InsufficientStorageError,
    InternalServerError,
    LoopDetectedError,
    NetworkAuthenticationRequiredError,
    NotExtendedError,
    NotImplementedError,
    ServiceUnavailableError,
    VariantAlsoNegotiatesError
} from "./server/index"
