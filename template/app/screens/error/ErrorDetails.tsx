import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      contentContainerStyle={$contentContainer}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text preset="subheading" style={$heading} tx="errorScreen.title" />
        <Text tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView contentContainerStyle={$errorSectionContentContainer} style={$errorSection}>
        <Text style={$errorContent} text={`${props.error}`.trim()} weight="bold" />
        <Text
          selectable
          style={$errorBacktrace}
          text={`${props.errorInfo.componentStack}`.trim()}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={$resetButton}
        tx="errorScreen.reset"
        onPress={props.onReset}
      />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.huge,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.medium,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.medium,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
}

const $errorContent: TextStyle = {
  color: colors.error,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.medium,
  color: colors.textDim,
}

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.extraLarge,
}
