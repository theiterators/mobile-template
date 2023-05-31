/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from "react-native"

const IGNORED_LOGS = ["Require cycle:"]

// prettier-ignore
LogBox.ignoreLogs(IGNORED_LOGS)

// Workaround for Expo 48
if (__DEV__) {
  const withoutIgnored =
    (logger) =>
    (...args) => {
      const output = args.join(" ")

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args)
      }
    }

  console.log = withoutIgnored(console.log)
  console.info = withoutIgnored(console.info)
  console.warn = withoutIgnored(console.warn)
  console.error = withoutIgnored(console.error)
}
