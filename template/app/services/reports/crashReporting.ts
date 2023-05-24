/**
 * If you're using Sentry
 *   RN   https://docs.sentry.io/platforms/react-native/
 *   Expo https://docs.expo.dev/guides/using-sentry/
 */
// import * as Sentry from "sentry-expo"
// import * as Sentry from "@sentry/react-native"

// import crashlytics from "@react-native-firebase/crashlytics"
import { CrashalyticsEventType, ErrorType } from "../../types"

/**
 * If you're using Bugsnag:
 *   RN   https://docs.bugsnag.com/platforms/react-native/)
 *   Expo https://docs.bugsnag.com/platforms/react-native/expo/
 */
// import Bugsnag from "@bugsnag/react-native"
// import Bugsnag from "@bugsnag/expo"

/**
 *  This is where you put your crash reporting service initialization code to call in `./app/app.tsx`
 */
export const initCrashReporting = () => {
  // Sentry.init({
  //   dsn: "YOUR DSN HERE",
  //   enableInExpoDevelopment: true,
  //   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  // })
  // Bugsnag.start("YOUR API KEY")
}

/**
 * Error classifications used to sort errors on error reporting services.
 */
/**
 * Manually report a handled error.
 */
export const reportCrash = (
  error: any,
  type: ErrorType = ErrorType.FATAL,
  eventMessage?: CrashalyticsEventType,
) => {
  if (__DEV__) {
    // Log to console and Reactotron in development
    const message = error.message || "Unknown"
    console.error(error)
    console.log(message, type)
    console.tron.log(error)
    return
  }
  // if (eventMessage) {
  //   crashlytics().log(eventMessage)
  // }
  // crashlytics().recordError(error)
  // In production, utilize crash reporting service of choice below:
  // RN
  // Sentry.captureException(error)
  // Expo
  // Sentry.Native.captureException(error)
  // Bugsnag.notify(error)
}
