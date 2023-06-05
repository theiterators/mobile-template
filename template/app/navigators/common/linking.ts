import * as Linking from "expo-linking"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
  },
}

export const linking = {
  prefixes: [prefix],
  config,
}
