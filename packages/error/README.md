# @fastify-utils/error

TypeScript-first error handling package implementing [RFC 9457 Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html).

> RFC 9457 obsoletes [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807.html) - this package implements the latest specification.

## Features

- **RFC 9457 Compliant** - Strictly follows the Problem Details specification
- **TypeScript First** - Full type safety with excellent IDE support
- **Auto-normalization** - Accepts `unknown` errors and normalizes them automatically
- **Categorized API** - Clean, readable error handling with `errors.client.*` and `errors.server.*`
- **39 Standard HTTP Errors** - Complete coverage of all standard HTTP error codes
- **Convenient Aliases** - Common shortcuts like `errors.server.db()` for frequent use cases
- **Built-in Middleware** - Ready-to-use error handlers for popular frameworks (Hono, and more coming)
- **Framework Agnostic** - Works with Express, Hono, Fastify, and any Node.js framework
- **Zero Dependencies** - Lightweight with no external dependencies (middleware have optional peer dependencies)
- **CommonJS** - Standard CommonJS for Node.js

## Installation

```bash
npm install @fastify-utils/error
# or
pnpm add @fastify-utils/error
```

## Quick Start

```javascript
// CommonJS
const { errors } = require("@fastify-utils/error")

// or TypeScript / ES Modules
import { errors } from "@fastify-utils/error"

// Client errors
throw errors.client.authentication("Invalid token")
throw errors.client.notFound("User", "123")
throw errors.client.validation("Email is required")

// Server errors
throw errors.server.internal("Database connection failed")
throw errors.server.db("Connection pool exhausted")
```

## Available Errors

### Client Errors (4xx)

28 client error types covering all standard 4xx HTTP status codes:

| Method                        | Status | Description                  | Example                                                                    |
| ----------------------------- | ------ | ---------------------------- | -------------------------------------------------------------------------- |
| `badRequest`                  | 400    | Malformed request            | `errors.client.badRequest("Invalid JSON")`                                 |
| `authentication`              | 401    | Missing/invalid credentials  | `errors.client.authentication("Token expired")`                            |
| `paymentRequired`             | 402    | Payment required             | `errors.client.paymentRequired("Subscription required")`                   |
| `authorization`               | 403    | Insufficient permissions     | `errors.client.authorization("Admin access required")`                     |
| `notFound`                    | 404    | Resource not found           | `errors.client.notFound("User", "123")`                                    |
| `methodNotAllowed`            | 405    | HTTP method not allowed      | `errors.client.methodNotAllowed("POST not allowed")`                       |
| `notAcceptable`               | 406    | Not acceptable               | `errors.client.notAcceptable("Only JSON supported")`                       |
| `proxyAuthenticationRequired` | 407    | Proxy auth required          | `errors.client.proxyAuthenticationRequired("Proxy auth needed")`           |
| `requestTimeout`              | 408    | Request timeout              | `errors.client.requestTimeout("Request took too long")`                    |
| `conflict`                    | 409    | Resource conflict            | `errors.client.conflict("Email already exists")`                           |
| `gone`                        | 410    | Resource permanently deleted | `errors.client.gone("Resource permanently deleted")`                       |
| `lengthRequired`              | 411    | Length header required       | `errors.client.lengthRequired("Content-Length required")`                  |
| `preconditionFailed`          | 412    | Precondition failed          | `errors.client.preconditionFailed("ETag mismatch")`                        |
| `payloadTooLarge`             | 413    | Payload too large            | `errors.client.payloadTooLarge("File too large", 5000000)`                 |
| `uriTooLong`                  | 414    | URI too long                 | `errors.client.uriTooLong("URL exceeds maximum length")`                   |
| `unsupportedMediaType`        | 415    | Unsupported media type       | `errors.client.unsupportedMediaType("Only image/* allowed")`               |
| `rangeNotSatisfiable`         | 416    | Range not satisfiable        | `errors.client.rangeNotSatisfiable("Invalid byte range")`                  |
| `expectationFailed`           | 417    | Expectation failed           | `errors.client.expectationFailed("Expect header failed")`                  |
| `misdirectedRequest`          | 421    | Misdirected request          | `errors.client.misdirectedRequest("Wrong server")`                         |
| `validation`                  | 422    | Invalid input data           | `errors.client.validation("Invalid email", { email: ["Invalid format"] })` |
| `locked`                      | 423    | Resource locked              | `errors.client.locked("Resource is locked")`                               |
| `failedDependency`            | 424    | Failed dependency            | `errors.client.failedDependency("Dependency failed")`                      |
| `tooEarly`                    | 425    | Too early                    | `errors.client.tooEarly("Request too early")`                              |
| `upgradeRequired`             | 426    | Upgrade required             | `errors.client.upgradeRequired("Upgrade to TLS required")`                 |
| `preconditionRequired`        | 428    | Precondition required        | `errors.client.preconditionRequired("If-Match header required")`           |
| `rateLimit`                   | 429    | Too many requests            | `errors.client.rateLimit("Rate limit exceeded", 60)`                       |
| `requestHeaderFieldsTooLarge` | 431    | Headers too large            | `errors.client.requestHeaderFieldsTooLarge("Request headers too large")`   |
| `unavailableForLegalReasons`  | 451    | Legal restriction            | `errors.client.unavailableForLegalReasons("Blocked by legal order")`       |

### Server Errors (5xx)

11 server error types plus convenient aliases:

| Method                          | Status | Description                     | Example                                                              |
| ------------------------------- | ------ | ------------------------------- | -------------------------------------------------------------------- |
| `internal`                      | 500    | Internal server error           | `errors.server.internal(caughtError)`                                |
| `notImplemented`                | 501    | Feature not implemented         | `errors.server.notImplemented("Feature not available")`              |
| `badGateway`                    | 502    | External service error          | `errors.server.badGateway(stripeError, "Stripe")`                    |
| `serviceUnavailable`            | 503    | Service temporarily unavailable | `errors.server.serviceUnavailable("Maintenance mode", 60)`           |
| `gatewayTimeout`                | 504    | External service timeout        | `errors.server.gatewayTimeout("Payment timeout", "Stripe")`          |
| `httpVersionNotSupported`       | 505    | HTTP version not supported      | `errors.server.httpVersionNotSupported("HTTP/2 required")`           |
| `variantAlsoNegotiates`         | 506    | Variant also negotiates         | `errors.server.variantAlsoNegotiates("Configuration error")`         |
| `insufficientStorage`           | 507    | Insufficient storage            | `errors.server.insufficientStorage("Out of storage space")`          |
| `loopDetected`                  | 508    | Loop detected                   | `errors.server.loopDetected("Circular dependency detected")`         |
| `notExtended`                   | 510    | Not extended                    | `errors.server.notExtended("Extension not supported")`               |
| `networkAuthenticationRequired` | 511    | Network authentication required | `errors.server.networkAuthenticationRequired("Proxy auth required")` |

**Convenient Aliases:**

Common shortcuts for frequent use cases:

| Alias                | Maps To               | Status | Example                                                           |
| -------------------- | --------------------- | ------ | ----------------------------------------------------------------- |
| **Client Aliases**   |                       |        |                                                                   |
| `validate`           | `validation`          | 422    | `errors.client.validate("Invalid email format")`                  |
| `permission`         | `authorization`       | 403    | `errors.client.permission("Access denied")`                       |
| `access`             | `authorization`       | 403    | `errors.client.access("Insufficient permissions")`                |
| `idNotFound`         | `notFound`            | 404    | `errors.client.idNotFound("User", "123")`                         |
| `duplicate`          | `conflict`            | 409    | `errors.client.duplicate("Email already exists")`                 |
| `thirdParty`         | `failedDependency`    | 424    | `errors.client.thirdParty("External service failed")`             |
| **Server Aliases**   |                       |        |                                                                   |
| `db`                 | `serviceUnavailable`  | 503    | `errors.server.db("Connection pool exhausted")`                   |
| `fetch`              | `badGateway`          | 502    | `errors.server.fetch("GitHub API unreachable")`                   |
| `envNotSet`          | `notImplemented`      | 501    | `errors.server.envNotSet("DATABASE_URL not configured")`          |
| `envInvalid`         | `notImplemented`      | 501    | `errors.server.envInvalid("DATABASE_URL must be a valid URL")`    |
| `maintenance`        | `serviceUnavailable`  | 503    | `errors.server.maintenance("System under maintenance")`           |
| `migration`          | `insufficientStorage` | 507    | `errors.server.migration("Migration storage limit exceeded")`     |
| `unhandledRejection` | `internal`            | 500    | `errors.server.unhandledRejection("Unhandled promise rejection")` |
| `uncaughtException`  | `internal`            | 500    | `errors.server.uncaughtException("Uncaught exception")`           |

## Usage Examples

### Basic Error Throwing

```typescript
import { errors } from "@fastify-utils/error"

if (!user) {
    throw errors.client.notFound("User", userId)
}

if (!hasPermission) {
    throw errors.client.authorization("Admin access required")
}
```

### Auto-Normalization

The package automatically normalizes any value to a string:

```typescript
import { errors } from "@fastify-utils/error"

try {
    await externalAPI.call()
} catch (err) {
    throw errors.server.badGateway(err, "External API")
}
```

### Validation Errors

```typescript
import { errors } from "@fastify-utils/error"

const validationErrors = {
    email: ["Invalid email format", "Email already exists"],
    password: ["Password too weak"]
}

throw errors.client.validation("Validation failed", validationErrors)
```

### NotFound with Auto-formatting

```typescript
import { errors } from "@fastify-utils/error"

// Auto-formatted message: "User 123 not found"
throw errors.client.notFound("User", "123")

// Custom message
throw errors.client.notFound("Custom message: User not found in database")
```

### Using Convenient Aliases

```typescript
import { errors } from "@fastify-utils/error"

// Validation errors
if (!email.includes("@")) {
    throw errors.client.validate("Invalid email format")
}

// Permission checks
if (!user.isAdmin) {
    throw errors.client.permission("Admin access required")
}

// ID lookups
const user = await db.findUser(userId)
if (!user) {
    throw errors.client.idNotFound("User", userId)
}

// Duplicate entries
if (await db.emailExists(email)) {
    throw errors.client.duplicate("User with this email already exists")
}

// Database errors
try {
    await db.query("SELECT * FROM users")
} catch (err) {
    throw errors.server.db(err)
}

// External API failures
try {
    await fetch("https://api.github.com/users/octocat")
} catch (err) {
    throw errors.server.fetch(err)
}

// Third-party integrations
try {
    await stripe.customers.create({ email })
} catch (err) {
    throw errors.client.thirdParty(err)
}

// Environment configuration - missing
if (!process.env.DATABASE_URL) {
    throw errors.server.envNotSet("DATABASE_URL environment variable not set")
}

// Environment configuration - invalid value
if (process.env.NODE_ENV && !["development", "production", "test"].includes(process.env.NODE_ENV)) {
    throw errors.server.envInvalid("NODE_ENV must be development, production, or test")
}

// Maintenance mode
if (isMaintenanceMode) {
    throw errors.server.maintenance("System is under scheduled maintenance", 3600)
}

// Migration failures
try {
    await runMigration()
} catch (err) {
    throw errors.server.migration(err)
}

// Node.js process error handlers
process.on("unhandledRejection", (reason) => {
    console.error(errors.server.unhandledRejection(reason))
    process.exit(1)
})

process.on("uncaughtException", (error) => {
    console.error(errors.server.uncaughtException(error))
    process.exit(1)
})
```

### Additional Utilities

```typescript
import { errors, isValidRFC9457Json } from "@fastify-utils/error"

// Create error by status code
throw errors.byStatus(404, "Not found")

// Get JSON without throwing
const json = errors.client.badRequest("Invalid input").toJSON()

// Validate RFC 9457 response
if (isValidRFC9457Json(data)) {
    // Valid RFC 9457 error
}
```

## Framework Integration

### Fastify

```typescript
import Fastify from "fastify"
import { errors, isHttpError } from "@fastify-utils/error"

const fastify = Fastify()

fastify.get("/users/:id", async (request, reply) => {
    const user = await db.users.findById(request.params.id)

    if (!user) {
        throw errors.client.notFound("User", request.params.id)
    }

    return user
})

fastify.setErrorHandler((error, request, reply) => {
    if (isHttpError(error)) {
        return reply.status(error.status).send(error.toJSON())
    }

    const internalError = errors.server.internal(error)
    reply.status(500).send(internalError.toJSON())
})
```

### Express

```typescript
import express from "express"
import { errors, isHttpError } from "@fastify-utils/error"

const app = express()

app.get("/users/:id", async (req, res) => {
    const user = await db.users.findById(req.params.id)

    if (!user) {
        throw errors.client.notFound("User", req.params.id)
    }

    res.json(user)
})

app.use((err, req, res, next) => {
    if (isHttpError(err)) {
        return res.status(err.status).json(err.toJSON())
    }

    const internalError = errors.server.internal(err)
    res.status(500).json(internalError.toJSON())
})
```

## Configuration

Set the base URL for error type URIs using the environment variable:

```bash
export RFC9457_BASE_URL=https://api.example.com/errors
```

## Error Response Format

All errors follow RFC 9457 structure:

```json
{
    "type": "about:blank#not-found",
    "title": "Not Found",
    "status": 404,
    "detail": "User 123 not found"
}
```

With custom base URL:

```json
{
    "type": "https://api.example.com/errors/validation",
    "title": "Validation Error",
    "status": 422,
    "detail": "Validation failed",
    "validationErrors": {
        "email": ["Invalid email format"]
    }
}
```

## TypeScript Support

Full type safety and IDE autocomplete:

```typescript
import { errors, isHttpError } from "@fastify-utils/error"

const err = errors.client.validation("Invalid data")

if (isHttpError(err)) {
    console.log(err.status) // 422
    console.log(err.toJSON()) // { type: "...", title: "...", ... }
}
```

## API Reference

### Categorized Errors (Recommended)

```typescript
import { errors } from "@fastify-utils/error"

throw errors.client.badRequest("Invalid input")
throw errors.server.internal("System error")
```

### Flat API (Alternative)

```typescript
import { error } from "@fastify-utils/error"

throw error.badRequest("Invalid input")
throw error.internal("System error")
```

### Helpers

```typescript
import { isHttpError } from "@fastify-utils/error"

if (isHttpError(err)) {
    console.log(err.status)
    console.log(err.toJSON())
}
```

## Development

```bash
pnpm install
node --run build
node --run lint
```

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
