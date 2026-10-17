import { HttpError } from "../../core/index"

export function isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError
}
