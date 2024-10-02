import React, { ComponentType, FC } from "react"
import { TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"

export interface RowProps extends TouchableOpacityProps {
  alignCenter?: boolean
}

export const Row: FC<RowProps> = ({ alignCenter, style, ...restProps }) => {
  const styles = [$container, style, alignCenter && $center]

  const Wrapper: ComponentType<TouchableOpacityProps> = restProps?.onPress ? TouchableOpacity : View

  return <Wrapper {...restProps} style={styles} />
}

const $container: ViewStyle = {
  flexDirection: "row",
}

const $center: ViewStyle = {
  alignItems: "center",
}
