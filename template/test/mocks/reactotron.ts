jest.mock("reactotron-react-native", () => ({
  configure: jest.fn(),
  useReactNative: jest.fn(),
  connect: jest.fn(),
  clear: jest.fn(),
  log: jest.fn(),
  logImportant: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}))
