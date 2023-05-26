import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Button, ControlledTextField } from "../../../components"
import { useStores } from "../../../models"
import { ILoginRequestData } from "../../../services/api"
import { spacing } from "../../../theme"

import { useAppForm, useFormComplete } from "../../../utils/hooks"
import { FORM_VALIDATION_RULES } from "../../../utils/validators"
// import Config from "app/config"
import { TEST_IDS } from "app/common/constants"

/* This code is defining an object called `defaultValues` with two properties: `username` and
`password`. The values of these properties are being set to `Config.TEST_USERNAME` and
`Config.TEST_PASSWORD` respectively. These values are likely being used as default values for the
`ControlledTextField` components in the `LoginForm` component. However, this code is currently
commented out, so the default values for the text fields are empty strings. */
// const defaultValues = {
//   username: Config.TEST_USERNAME,
//   password: Config.TEST_PASSWORD,
// }

// you can uncomment this code to see what the default values look like
const defaultValues = {
  username: "",
  password: "",
}

export const LoginForm: FC = observer(() => {
  const {
    authStore: { isDataLoading, login },
  } = useStores()

  const { control, handleSubmit, setFocus } = useAppForm({
    defaultValues,
  })
  const { complete: isButtonEnabled } = useFormComplete(control)
  const onSubmit = (data: ILoginRequestData) => {
    login(data)
  }

  return (
    <View style={$formContainer}>
      <ControlledTextField
        control={control}
        inputWrapperStyle={$inputWrapperStyle}
        name="username"
        placeholderTx="loginScreen.username"
        returnKeyType="next"
        testID={TEST_IDS.auth.login.usernameField}
        rules={FORM_VALIDATION_RULES.required}
        onSubmitEditing={() => setFocus("password")}
      />
      <ControlledTextField
        secureTextEntry
        control={control}
        inputWrapperStyle={$inputWrapperStyle}
        name="password"
        placeholderTx="loginScreen.password"
        returnKeyType="done"
        testID={TEST_IDS.auth.login.passwordField}
        rules={FORM_VALIDATION_RULES.required}
      />
      <Button
        testID={TEST_IDS.auth.login.signInButton}
        tx="loginScreen.tapToSignIn"
        disabled={!isButtonEnabled}
        isLoading={isDataLoading}
        style={$tapButton}
        preset="reversed"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
})

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $inputWrapperStyle: ViewStyle = {
  width: "100%",
  paddingVertical: spacing.tiny,
  marginTop: spacing.small,
}
