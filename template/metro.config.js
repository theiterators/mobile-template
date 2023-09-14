const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config")

let metroConfig
let isExpo = false
try {
  const Constants = require("expo-constants")
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo =
    Constants.executionEnvironment === "standalone" ||
    Constants.executionEnvironment === "storeClient"
} catch {}

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {}

if (isExpo) {
  /**
     *  Expo metro config
     * Learn more https://docs.expo.io/guides/customizing-metro

    * For one idea on how to support symlinks in Expo, see:
    * https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
    */
  metroConfig = getDefaultExpoConfig(__dirname)
} else {
  metroConfig = getDefaultConfig(__dirname)
}

module.exports = mergeConfig(metroConfig, config)
