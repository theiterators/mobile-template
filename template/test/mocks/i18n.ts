jest.mock("i18n-js", () => {
  const I18n = jest.fn().mockImplementation(() => ({
    currentLocale: () => "en",
    t: (key: string, params: Record<string, string>) => {
      return `${key} ${JSON.stringify(params)}`
    },
    translations: { en: { greeting: "Hello" }, "en-US": { greeting: "Hello" } }, // Example translations
    locale: "en",
  }))

  return { I18n }
})
