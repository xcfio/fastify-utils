import { factories as clientFactories } from "./errors/client/index"
import { factories as serverFactories } from "./errors/server/index"
import { createErrorByStatus } from "./helpers/index"

export const errors = {
    client: clientFactories,
    server: serverFactories,
    byStatus: createErrorByStatus
}
