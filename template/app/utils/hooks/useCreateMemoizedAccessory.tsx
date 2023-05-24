import React, { useMemo } from "react"
import { ImageStyle, ViewStyle } from "react-native"

import { Icon, IconTypes } from "../../components"

// https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md#rightaccessory-and-leftaccessory
const useCreateMemoizedAccessory = (icon: IconTypes, color?: string, style?: ImageStyle) =>
  useMemo(() => {
    const Accessory = () => (
      <Icon
        color={color}
        containerStyle={$accessoryContainer}
        icon={icon}
        size={18}
        style={[$accessory, style]}
      />
    )
    return Accessory
  }, [icon, color, style])

export { useCreateMemoizedAccessory }

const $accessory: ImageStyle = {
  opacity: 0.8,
}

const $accessoryContainer: ViewStyle = {
  alignSelf: "center",
}
