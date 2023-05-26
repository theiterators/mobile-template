import Config, { NativeConfig } from "react-native-config"

export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
}
interface ConfigType extends NativeConfig {
  API_URL: string
  PRODUCTION: string
  TEST_USERNAME: string
  TEST_PASSWORD: string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],
}

const ExtraConfig: ConfigType = {
  API_URL: Config.API_URL,
  PRODUCTION: Config.PRODUCTION,
  TEST_USERNAME: Config.TEST_USERNAME,
  TEST_PASSWORD: Config.TEST_PASSWORD,
}

export default { ...BaseConfig, ...ExtraConfig }
