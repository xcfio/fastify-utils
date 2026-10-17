import type { ValidationErrors } from "../../types/index"
import * as ErrorClasses from "./index"

const standardFactories = {
    badRequest: (detail: unknown) => new ErrorClasses.BadRequestError(detail),
    paymentRequired: (detail: unknown) => new ErrorClasses.PaymentRequiredError(detail),
    authentication: (detail: unknown) => new ErrorClasses.AuthenticationError(detail),
    authorization: (detail: unknown) => new ErrorClasses.AuthorizationError(detail),
    notFound: (resourceOrDetail: unknown, id?: string) => new ErrorClasses.NotFoundError(resourceOrDetail, id),
    methodNotAllowed: (detail: unknown) => new ErrorClasses.MethodNotAllowedError(detail),
    notAcceptable: (detail: unknown) => new ErrorClasses.NotAcceptableError(detail),
    proxyAuthenticationRequired: (detail: unknown) => new ErrorClasses.ProxyAuthenticationRequiredError(detail),
    requestTimeout: (detail: unknown) => new ErrorClasses.RequestTimeoutError(detail),
    conflict: (detail: unknown) => new ErrorClasses.ConflictError(detail),
    gone: (detail: unknown) => new ErrorClasses.GoneError(detail),
    lengthRequired: (detail: unknown) => new ErrorClasses.LengthRequiredError(detail),
    preconditionFailed: (detail: unknown) => new ErrorClasses.PreconditionFailedError(detail),
    payloadTooLarge: (detail: unknown, maxSize?: number) => new ErrorClasses.PayloadTooLargeError(detail, maxSize),
    uriTooLong: (detail: unknown) => new ErrorClasses.UriTooLongError(detail),
    unsupportedMediaType: (detail: unknown) => new ErrorClasses.UnsupportedMediaTypeError(detail),
    rangeNotSatisfiable: (detail: unknown) => new ErrorClasses.RangeNotSatisfiableError(detail),
    expectationFailed: (detail: unknown) => new ErrorClasses.ExpectationFailedError(detail),
    misdirectedRequest: (detail: unknown) => new ErrorClasses.MisdirectedRequestError(detail),
    validation: (detail: unknown, validationErrors?: ValidationErrors) =>
        new ErrorClasses.ValidationError(detail, validationErrors),
    locked: (detail: unknown) => new ErrorClasses.LockedError(detail),
    failedDependency: (detail: unknown) => new ErrorClasses.FailedDependencyError(detail),
    tooEarly: (detail: unknown) => new ErrorClasses.TooEarlyError(detail),
    upgradeRequired: (detail: unknown) => new ErrorClasses.UpgradeRequiredError(detail),
    preconditionRequired: (detail: unknown) => new ErrorClasses.PreconditionRequiredError(detail),
    rateLimit: (detail: unknown, retryAfter?: number) => new ErrorClasses.RateLimitError(detail, retryAfter),
    requestHeaderFieldsTooLarge: (detail: unknown) => new ErrorClasses.RequestHeaderFieldsTooLargeError(detail),
    unavailableForLegalReasons: (detail: unknown) => new ErrorClasses.UnavailableForLegalReasonsError(detail)
}

const aliases = {
    validate: (detail: unknown, validationErrors?: ValidationErrors) =>
        standardFactories.validation(detail, validationErrors),
    permission: (detail: unknown) => standardFactories.authorization(detail),
    access: (detail: unknown) => standardFactories.authorization(detail),
    idNotFound: (resourceOrDetail: unknown, id?: string) => standardFactories.notFound(resourceOrDetail, id),
    duplicate: (detail: unknown) => standardFactories.conflict(detail),
    thirdParty: (detail: unknown) => standardFactories.failedDependency(detail)
}

export const factories = {
    ...standardFactories,
    ...aliases
}
