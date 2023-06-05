// include this line for mocking react-native-gesture-handler

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock")

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => jest.fn()

  return Reanimated
})

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter")
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }
})
