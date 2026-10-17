import type { HttpError } from "../../core/index"
import { factories as clientFactories } from "../../errors/client/index"
import { factories as serverFactories } from "../../errors/server/index"

export const createErrorByStatus = (status: number, detail: unknown): HttpError => {
    switch (status) {
        case 400:
            return clientFactories.badRequest(detail)
        case 401:
            return clientFactories.authentication(detail)
        case 402:
            return clientFactories.paymentRequired(detail)
        case 403:
            return clientFactories.authorization(detail)
        case 404:
            return clientFactories.notFound(detail)
        case 405:
            return clientFactories.methodNotAllowed(detail)
        case 406:
            return clientFactories.notAcceptable(detail)
        case 407:
            return clientFactories.proxyAuthenticationRequired(detail)
        case 408:
            return clientFactories.requestTimeout(detail)
        case 409:
            return clientFactories.conflict(detail)
        case 410:
            return clientFactories.gone(detail)
        case 411:
            return clientFactories.lengthRequired(detail)
        case 412:
            return clientFactories.preconditionFailed(detail)
        case 413:
            return clientFactories.payloadTooLarge(detail)
        case 414:
            return clientFactories.uriTooLong(detail)
        case 415:
            return clientFactories.unsupportedMediaType(detail)
        case 416:
            return clientFactories.rangeNotSatisfiable(detail)
        case 417:
            return clientFactories.expectationFailed(detail)
        case 421:
            return clientFactories.misdirectedRequest(detail)
        case 422:
            return clientFactories.validation(detail)
        case 423:
            return clientFactories.locked(detail)
        case 424:
            return clientFactories.failedDependency(detail)
        case 425:
            return clientFactories.tooEarly(detail)
        case 426:
            return clientFactories.upgradeRequired(detail)
        case 428:
            return clientFactories.preconditionRequired(detail)
        case 429:
            return clientFactories.rateLimit(detail)
        case 431:
            return clientFactories.requestHeaderFieldsTooLarge(detail)
        case 451:
            return clientFactories.unavailableForLegalReasons(detail)
        case 500:
            return serverFactories.internal(detail)
        case 501:
            return serverFactories.notImplemented(detail)
        case 502:
            return serverFactories.badGateway(detail)
        case 503:
            return serverFactories.serviceUnavailable(detail)
        case 504:
            return serverFactories.gatewayTimeout(detail)
        case 505:
            return serverFactories.httpVersionNotSupported(detail)
        case 506:
            return serverFactories.variantAlsoNegotiates(detail)
        case 507:
            return serverFactories.insufficientStorage(detail)
        case 508:
            return serverFactories.loopDetected(detail)
        case 510:
            return serverFactories.notExtended(detail)
        case 511:
            return serverFactories.networkAuthenticationRequired(detail)
        default:
            if (status >= 400 && status < 500) {
                return clientFactories.badRequest(detail)
            }
            return serverFactories.internal(detail)
    }
}
