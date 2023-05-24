import { Alert } from "react-native"

export const useAlert = () => {
  const showAlert = (message: string) => {
    Alert.alert("Error", message, [
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }

  return showAlert
}
