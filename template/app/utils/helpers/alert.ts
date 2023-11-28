import { Alert, AlertButton } from "react-native"

import { translate, TxKeyPath } from "app/i18n"

interface AlertOptions {
  /**
   * Buttons to be displayed in the alert.
   */
  buttons?: AlertButton[]
  /**
   * Message for the alert, typically coming from the backend.
   */
  message?: string
  /**
   * Localized message key for displaying application-specific messages.
   */
  messageTx?: TxKeyPath
  /**
   * Title of the alert.
   */
  title?: string
  /**
   * Localized title key for displaying application-specific titles.
   */
  titleTx?: TxKeyPath
}

export const showAlert = ({
  buttons = [{ text: "Cancel", style: "cancel" }],
  message = "",
  messageTx = "errors.somethingWentWrong",
  title = "",
  titleTx = "errors.error",
}: AlertOptions) => {
  const alertText = message || translate(messageTx)
  const titleText = title || translate(titleTx)

  Alert.alert(titleText, alertText, buttons)
}
