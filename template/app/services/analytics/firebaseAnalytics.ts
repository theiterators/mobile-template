// import analytics from "@react-native-firebase/analytics"
import { AnalyticsEventType } from "../../types"

const Analytics = {
  async trackEvent(
    name: AnalyticsEventType,
    params?: {
      [key: string]: any
    },
  ) {
    // await analytics().logEvent(name, params)
    console.log("[Analytics] trackEvent", name, params)
  },

  async trackScreen(currentRouteName: string) {
    // await analytics().logScreenView({
    //   screen_name: currentRouteName,
    //   screen_class: currentRouteName,
    // })
    console.log("[Analytics] trackScreen", currentRouteName)
  },
}

export default Analytics
