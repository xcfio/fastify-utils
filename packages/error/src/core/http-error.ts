import type { HttpErrorParams } from "../types/index"

export class HttpError extends Error {
    public readonly type: string
    public readonly title: string
    public readonly status: number
    public readonly detail: string
    public readonly instance?: string

    constructor(params: HttpErrorParams) {
        super(params.detail, { cause: params.cause })
        this.name = "HttpError"
        this.type = params.type
        this.title = params.title
        this.status = params.status
        this.detail = params.detail
        this.instance = params.instance

        Error.captureStackTrace(this, this.constructor)
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            title: this.title,
            status: this.status,
            detail: this.detail,
            ...(this.instance && { instance: this.instance })
        }
    }
}
