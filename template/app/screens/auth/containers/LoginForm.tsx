import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Button, ControlledTextField } from "../../../components"
import { useStores } from "../../../models"
import { ILoginRequestData } from "../../../services/api"
import { spacing } from "../../../theme"

import { useAppForm, useFormComplete } from "../../../utils/hooks"
import { FORM_VALIDATION_RULES } from "../../../utils/validation"

const defaultValues = {
  username: "jkowalski",
  password: "d03676cd116b76b48ab4756232949f76",
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
        placeholderTx="loginScreen.login"
        returnKeyType="next"
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
        rules={FORM_VALIDATION_RULES.required}
      />
      <Button
        testID="login-button"
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
