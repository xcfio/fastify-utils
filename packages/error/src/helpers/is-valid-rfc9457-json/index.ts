export const isValidRFC9457Json = (data: unknown): boolean => {
    if (!data || typeof data !== "object") {
        return false
    }

    const obj = data as Record<string, unknown>

    return "type" in obj && "title" in obj && "status" in obj && "detail" in obj
}
