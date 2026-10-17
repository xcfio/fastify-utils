/* eslint-disable typescript/no-base-to-string */
export function normalizeToString(value: unknown): string {
    if (value instanceof Error) {
        return value.message
    }

    if (typeof value === "string") {
        return value
    }

    if (value === null || value === undefined) {
        return "Unknown error"
    }

    if (typeof value === "object") {
        try {
            return JSON.stringify(value)
        } catch {
            return String(value)
        }
    }

    return String(value)
}
