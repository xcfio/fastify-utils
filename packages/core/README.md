# fastify-utils

A collection of TypeScript utilities for building Fastify applications — error handling, schema validation formatting, and object serialization.

## Requirements

- [Node.js](https://nodejs.org/) `>=24`.
- [pnpm](https://pnpm.io/) `>=10` (recommended).
- [TypeScript](https://www.typescriptlang.org/) `>=5` (recommended).

## Installation

```bash
npm install fastify-utils
# or
pnpm add fastify-utils
```

## Quick Start

```typescript
import { errors, schemaErrorFormatter, serialize } from "fastify-utils"

// Schema validation formatter
const fastify = Fastify({
    // ...other options
    schemaErrorFormatter
})

// Error handling (RFC 9457)
throw errors.client.notFound("User", "123")

// Serialize DB records
const row = { name: "Cool", createdAt: new Date() }
serialize(row) // { name: "Cool", createdAt: "2026-01-01T00:00:00.000Z" }
```

---

## API

### Error Handling

> Re-exported from `@fastify-utils/error`. Implements [RFC 9457 Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html).

`fastify-utils` re-exports the complete `@fastify-utils/error` suite for standardized error handling.

```typescript
import { errors, isHttpError, isValidRFC9457Json } from "fastify-utils"

// Client errors (4xx)
throw errors.client.notFound("User", "123")
throw errors.client.badRequest("Invalid input")
throw errors.client.authentication("Token expired")
throw errors.client.authorization("Access denied")
throw errors.client.validation("Validation failed", { email: ["Invalid format"] })

// Server errors (5xx)
throw errors.server.internal("Database connection failed")
throw errors.server.badGateway("Upstream payment service unavailable", "Stripe")

// Helpers
if (isHttpError(error)) {
    console.log(error.status, error.title, error.detail)
}
```

---

### Schema Utilities

> Requires `typebox` as a peer dependency.

#### `schemaErrorFormatter`

A `SchemaErrorFormatter` for Fastify that formats AJV validation errors into an RFC 9457 Problem Details structured response.

- Strips noisy `anyOf` wrapper errors
- Aggregates `const` keyword errors into `must be one of: ...` messages
- Groups errors by field path, joined as a semicolon-separated message string
- Returns an RFC 9457 `ValidationError` (HTTP 422)

> **Note:** `ValidationErrorHandler` is also exported as a backward-compatible alias.

Can be used via `setSchemaErrorFormatter` or directly in the Fastify constructor:

```typescript
// Via constructor (recommended)
const fastify = Fastify({
    // ...other options
    schemaErrorFormatter
})

// Or via setter
fastify.setSchemaErrorFormatter(schemaErrorFormatter)
```

**Response shape:**

```json
{
    "type": "about:blank#validation",
    "title": "Validation Error",
    "status": 422,
    "detail": "Schema validation failed for body: email: must be string; role must be one of: admin, user"
}
```

---

#### `ValidationErrorResponse`

TypeBox schema for the full RFC 9457 422 response body. Use in route response schemas.

```typescript
import { ValidationErrorResponse } from "fastify-utils"

fastify.route({
    method: "POST",
    url: "/",
    schema: {
        response: { 422: ValidationErrorResponse }
    },
    handler: async (request, reply) => { ... }
})
```

---

### Serialization

#### `serialize<T>(arg)`

Recursively converts all `Date` instances in an object to ISO 8601 strings. Useful for serializing database records before returning them from a Fastify route.

| Input              | Output                 |
| ------------------ | ---------------------- |
| `Date`             | ISO 8601 string        |
| `null`/`undefined` | `null`                 |
| `Date[]`           | `string[]`             |
| Nested object      | Recursively serialized |
| Everything else    | Passed through         |

```typescript
const user = { name: "Cool", createdAt: new Date(), tags: [new Date()] }
serialize(user)
// { name: "Cool", createdAt: "2026-01-01T00:00:00.000Z", tags: ["2026-01-01T00:00:00.000Z"] }

// Nested objects
const post = { title: "Hello", author: { name: "Cool", joinedAt: new Date() } }
serialize(post)
// { title: "Hello", author: { name: "Cool", joinedAt: "2026-01-01T00:00:00.000Z" } }
```

#### `Serialize<T>`

Utility type that mirrors `serialize()` at the type level — transforms all `Date` fields to `string`.

```typescript
type User = { name: string; createdAt: Date; tags: Date[] }
type SerializedUser = Serialize<User>
// { name: string; createdAt: string; tags: string[] }
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

## Links

| Resource    | URL                                           |
| ----------- | --------------------------------------------- |
| GitHub      | https://github.com/xcfio/fastify-utils        |
| npm         | https://www.npmjs.com/package/fastify-utils   |
| Bug reports | https://github.com/xcfio/fastify-utils/issues |
| Help        | https://dsc.gg/xcfio                          |

---

Made with ❤️ by [xcfio](https://github.com/xcfio)
