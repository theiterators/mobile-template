import React, { FC } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"

import { colors } from "../theme"

const DEFAULT_LOADING_SPINNER_SIZE = 30

type Props = {
  size?: number
}

export const LoadingSpinner: FC<Props> = ({ size = DEFAULT_LOADING_SPINNER_SIZE }) => {
  return (
    <View style={$container}>
      <ActivityIndicator color={colors.palette.neutral100} size={size} />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
