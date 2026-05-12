# fastify-utils

A collection of TypeScript utilities for building Fastify applications — error handling, schema validation formatting, and object serialization.

## Requirements

| Dependency       | Version          |
| ---------------- | ---------------- |
| Node.js          | `>=22`           |
| `fastify`        | `>=5.0.0 <6.0.0` |
| `@fastify/error` | `>=4.0.0 <5.0.0` |
| `typebox`        | `>=1.0.0 <2.0.0` |

## Installation

```bash
npm install fastify-utils
# or
pnpm add fastify-utils
```

## Quick Start

```typescript
import { CreateError, ValidationErrorHandler, serialize } from "fastify-utils"

// Error handling
throw CreateError(404, "USER_NOT_FOUND", "User not found", { userId: "123" })

// Schema validation formatter
fastify.setSchemaErrorFormatter(ValidationErrorHandler)

// Serialize DB records
const row = { name: "Cool", createdAt: new Date() }
serialize(row) // { name: "Cool", createdAt: "2026-01-01T00:00:00.000Z" }
```

---

## API

### Error Utilities

#### `CreateError(statusCode, code, message, details?)`

Creates a Fastify-compatible error using `@fastify/error`.

| Parameter    | Type                  | Description                               |
| ------------ | --------------------- | ----------------------------------------- |
| `statusCode` | `number`              | HTTP status code (100–599)                |
| `code`       | `string`              | Unique error code (e.g. `USER_NOT_FOUND`) |
| `message`    | `string`              | Human-readable error message              |
| `details`    | `Record<string, any>` | Optional additional error metadata        |

```typescript
throw CreateError(404, "USER_NOT_FOUND", "User not found", { userId: "123" })

throw CreateError(400, "VALIDATION_ERROR", "Invalid input")
```

---

#### `isFastifyError(error)`

Type guard to check if an error is a `FastifyError`.

```typescript
try {
    // some operation
} catch (error) {
    if (isFastifyError(error)) throw error
    console.trace(error)
}
```

---

### Schema Utilities

> Requires `typebox` as a peer dependency.

#### `ValidationErrorHandler`

A `SchemaErrorFormatter` for Fastify that formats AJV validation errors into a structured, developer-friendly response.

- Strips noisy `anyOf` wrapper errors
- Aggregates `const` keyword errors into `must be one of: ...` messages
- Converts `instancePath` (e.g. `/address/zip`) to dot-notation (e.g. `address.zip`)

```typescript
fastify.setSchemaErrorFormatter(ValidationErrorHandler)
```

**Response shape:**

```json
{
    "code": "SCHEMA_VALIDATION_ERROR",
    "message": "Validation failed for body",
    "errors": [
        { "field": "email", "message": "must be string", "keyword": "type", "received": 123 },
        { "field": "role", "message": "must be one of: admin, user", "keyword": "const", "received": "superadmin" },
        { "field": "address.zip", "message": "must match pattern", "keyword": "pattern", "received": "abcd" }
    ]
}
```

---

#### `ValidationErrorItem`

TypeBox schema for a single validation error item.

```typescript
import { ValidationErrorItem } from "fastify-utils"

// { field: string, message: string, keyword: string, received?: unknown }
```

---

#### `ValidationErrorResponse`

TypeBox schema for the full 400 response body. Use in route response schemas.

```typescript
import { ValidationErrorResponse } from "fastify-utils"

fastify.route({
    method: "POST",
    url: "/",
    schema: {
        response: { 400: ValidationErrorResponse }
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
