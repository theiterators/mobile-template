// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"

import App from "./app/app.tsx"

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("PlaceholderName", () => IgniteApp)
export default App
