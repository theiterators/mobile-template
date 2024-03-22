import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

export interface SpacerProps {
  horizontal?: boolean
  size?: number | `${number}%`
}

export const DEFAULT_SPACING_SIZE = 16

export const Spacer: FC<SpacerProps> = ({ horizontal, size = DEFAULT_SPACING_SIZE }) => {
  const spacerStyle: ViewStyle = { [horizontal ? "width" : "height"]: size }

  return <View style={spacerStyle} />
}
