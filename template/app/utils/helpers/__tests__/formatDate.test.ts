import { parseISO } from "date-fns"
import I18n from "i18n-js"
import pl from "date-fns/locale/pl"
import en from "date-fns/locale/en-US"
import { formatDate } from "../formatDate" // Replace "yourFile" with the appropriate file path

jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  format: jest.fn(),
}))

jest.mock("i18n-js", () => ({
  currentLocale: jest.fn(),
}))

describe("formatDate", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should format the date using the default format and locale", () => {
    const formatMock = jest.requireMock("date-fns").format
    const currentLocaleMock = jest.spyOn(I18n, "currentLocale").mockReturnValue("en-US")

    const date = "2023-06-02T12:34:56"
    formatDate(date)
    expect(formatMock).toHaveBeenCalledWith(parseISO(date), "MMM dd, yyyy", {
      locale: en,
    })

    currentLocaleMock.mockRestore()
  })

  it("should format the date using the provided format and locale", () => {
    const formatMock = jest.requireMock("date-fns").format
    const currentLocaleMock = jest.spyOn(I18n, "currentLocale").mockReturnValue("pl")

    const date = "2023-06-02T12:34:56"
    const dateFormat = "dd MMM yyyy"
    const options = { weekStartsOn: 1 }
    formatDate(date, dateFormat, options)

    expect(formatMock).toHaveBeenCalledWith(parseISO(date), dateFormat, {
      locale: pl,
      weekStartsOn: 1,
    })

    currentLocaleMock.mockRestore()
  })
})
