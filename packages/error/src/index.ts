/**
 * Flattened collection of factory functions combining all client and server error factories.
 */
export { error } from "./error"

/**
 * Categorized error factories namespace: `errors.client`, `errors.server`, and `errors.byStatus`.
 */
export { errors } from "./errors"

/**
 * Helper utilities for type checking and validating RFC 9457 errors.
 */
export { isHttpError, isValidRFC9457Json } from "./helpers"

/**
 * Type representing field-level validation error messages.
 */
export type { ValidationErrors } from "./types"
