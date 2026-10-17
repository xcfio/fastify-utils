export function extractCause(value: unknown): Error | undefined {
    if (value instanceof Error) {
        return value
    }

    return undefined
}
