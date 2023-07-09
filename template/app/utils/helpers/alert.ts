import { Alert, AlertButton } from "react-native"

export const showAlert = ({
  buttons = [{ text: "Cancel", style: "cancel" }],
  message,
  title = "Error",
}: {
  buttons?: AlertButton[]
  message?: string
  title?: string
}) => {
  Alert.alert(title, message, buttons)
}
