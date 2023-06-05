jest.mock("@react-navigation/elements", () => ({
  useHeaderHeight: jest.fn().mockImplementation(() => 200),
}))
