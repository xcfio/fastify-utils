export interface ErrorConfig {
    baseUrl?: string
}

export interface HttpErrorParams {
    type: string
    title: string
    status: number
    detail: string
    instance?: string
    cause?: Error
}

export interface ValidationErrors {
    [field: string]: string[]
}
