import { factories as clientFactories } from "./errors/client"
import { factories as serverFactories } from "./errors/server"

/**
 * Flat collection of factory functions combining all client (4xx) and server (5xx) error factories.
 *
 * Provides a flattened API alternative to {@link errors.client} and {@link errors.server}.
 *
 * @example
 * ```typescript
 * import { error } from "@fastify-utils/error"
 *
 * throw error.notFound("User", "123")
 * throw error.badRequest("Invalid JSON")
 * throw error.internal("Unexpected error")
 * throw error.db("Database connection pool exhausted")
 * ```
 */
export const error = {
    ...clientFactories,
    ...serverFactories
}
