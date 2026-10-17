import { factories as clientFactories } from "./errors/client/index"
import { factories as serverFactories } from "./errors/server/index"

export const error = {
    ...clientFactories,
    ...serverFactories
}
