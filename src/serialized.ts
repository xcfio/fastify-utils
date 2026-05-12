/**
 * Recursively transforms a type by converting all `Date` values to `string`,
 * preserving `null`, arrays, and nested objects.
 *
 * @template T - The source type to serialize.
 *
 * @example
 * type User = { name: string; createdAt: Date; tags: Date[] }
 * type SerializedUser = Serialized<User>
 * // { name: string; createdAt: string; tags: string[] }
 */
export type Serialize<T> = {
    [K in keyof T]: T[K] extends Date
        ? string
        : T[K] extends Date | null
          ? string | null
          : T[K] extends (infer U)[]
            ? U extends Date
                ? string[]
                : Serialize<U>[]
            : T[K] extends object
              ? Serialize<T[K]>
              : T[K]
}

/**
 * Recursively serializes a database record into a JSON/TypeBox-compatible
 * plain object by converting all `Date` instances to ISO 8601 strings.
 *
 * - `Date` → ISO 8601 string via `.toISOString()`
 * - `null` / `undefined` → `null`
 * - `Date[]` → `string[]`
 * - Nested objects → recursively serialized
 * - All other values → passed through as-is
 *
 * @template T - A record type extending `Record<string, unknown>`.
 * @param arg - The object to serialize.
 * @returns A new object with the same shape but all `Date` values converted to strings.
 *
 * @example
 * ```typescript
 * const user = { name: "Cool", createdAt: new Date(), tags: [new Date()] }
 * const serialized = serialize(user)
 * // { name: "Cool", createdAt: "2026-01-01T00:00:00.000Z", tags: ["2026-01-01T00:00:00.000Z"] }
 * ```
 *
 * @example
 * ```typescript
 * // Nested objects are handled recursively
 * const post = { title: "hi", author: { name: "Cool", joinedAt: new Date() } }
 * const serialized = serialize(post)
 * // { title: "hi", author: { name: "Cool", joinedAt: "2026-01-01T00:00:00.000Z" } }
 * ```
 */
export function serialize<T extends Record<string, unknown>>(arg: T): Serialize<T> {
    if (!arg || typeof arg !== "object") return arg as Serialize<T>

    const result = {} as Record<string, unknown>

    for (const [key, value] of Object.entries(arg)) {
        if (value === null || value === undefined) {
            result[key] = null
        } else if (value instanceof Date) {
            result[key] = value.toISOString()
        } else if (Array.isArray(value)) {
            result[key] = value.map((item) =>
                item instanceof Date
                    ? item.toISOString()
                    : typeof item === "object" && item !== null
                      ? serialize(item as Record<string, unknown>)
                      : item
            )
        } else if (typeof value === "object") {
            result[key] = serialize(value as Record<string, unknown>)
        } else {
            result[key] = value
        }
    }

    return result as Serialize<T>
}
