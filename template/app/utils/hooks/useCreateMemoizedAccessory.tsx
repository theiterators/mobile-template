import React, { useMemo } from "react"
import { ImageStyle, ViewStyle } from "react-native"

import { Icon, IconTypes } from "../../components"
import { ACTIVE_OPACITY } from "app/theme"

const DEFAULT_ICON_SIZE = 18

interface IuseCreateMemoizedAccessoryProps {
  color?: string
  containerStyle?: ViewStyle
  icon: IconTypes
  onPress?: () => void
  size?: number
  style?: ImageStyle
}

// https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md#rightaccessory-and-leftaccessory
const useCreateMemoizedAccessory = ({
  color,
  containerStyle,
  icon,
  onPress,
  size = DEFAULT_ICON_SIZE,
  style,
}: IuseCreateMemoizedAccessoryProps) =>
  useMemo(() => {
    const Accessory = () => (
      <Icon
        color={color}
        containerStyle={containerStyle}
        icon={icon}
        size={size}
        style={[$accessory, style]}
        onPress={onPress}
      />
    )
    return Accessory
  }, [color, containerStyle, icon, size, style, onPress])

export { useCreateMemoizedAccessory }

const $accessory: ImageStyle = {
  opacity: ACTIVE_OPACITY,
}
