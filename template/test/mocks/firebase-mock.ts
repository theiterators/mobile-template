const mockLogEvent = jest.fn()

jest.mock("@react-native-firebase/analytics", () => {
  return jest.fn().mockReturnValue({ logEvent: mockLogEvent })
})

jest.mock("@react-native-firebase/crashlytics", () => {
  return jest.fn().mockReturnValue({ log: mockLogEvent, recordError: mockLogEvent })
})
