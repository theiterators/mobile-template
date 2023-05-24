import { api } from "./api"
import { AppLifeCycle } from "./appLifecycle"

export const appLifeCycle = AppLifeCycle.getInstance(api)
