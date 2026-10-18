import { factories as clientFactories } from "./errors/client/index"
import { factories as serverFactories } from "./errors/server/index"
import { createErrorByStatus } from "./helpers/index"

/**
 * Categorized namespace for creating RFC 9457 Problem Details HTTP errors.
 *
 * Organized into:
 * - `client`: 28 standard 4xx error factories plus convenient aliases (e.g. `validate`, `permission`, `idNotFound`, `duplicate`)
 * - `server`: 11 standard 5xx error factories plus convenient aliases (e.g. `db`, `fetch`, `maintenance`, `envNotSet`)
 * - `byStatus`: Helper to construct an {@link HttpError} dynamically from a numeric HTTP status code
 *
 * @example
 * ```typescript
 * import { errors } from "@fastify-utils/error"
 *
 * // Client errors (4xx)
 * throw errors.client.notFound("User", "123")
 * throw errors.client.validation("Invalid email", { email: ["Invalid format"] })
 *
 * // Server errors (5xx)
 * throw errors.server.internal(new Error("Unexpected error"))
 * throw errors.server.db("Query failed")
 *
 * // Dynamic by HTTP status code
 * throw errors.byStatus(404, "Page not found")
 * ```
 */
export const errors = {
    client: clientFactories,
    server: serverFactories,
    byStatus: createErrorByStatus
}
