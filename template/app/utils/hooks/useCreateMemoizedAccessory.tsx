import React, { useMemo } from "react"
import { ImageStyle, ViewStyle } from "react-native"

import { ACTIVE_OPACITY } from "app/theme"

import { Icon, IconTypes } from "../../components"

const DEFAULT_ICON_SIZE = 18

interface IuseCreateMemoizedAccessoryProps {
  /**
   * Color of the icon.
   */
  color?: string
  /**
   * Style for the container that holds the icon.
   */
  containerStyle?: ViewStyle
  /**
   * Type of the icon to be used.
   */
  icon: IconTypes
  /**
   * Function to be executed on icon press.
   */
  onPress?: () => void
  /**
   * Size of the icon.
   */
  size?: number
  /**
   * Style for the icon itself.
   */
  style?: ImageStyle
}

/**
 * A memoized accessory component for rendering icons.
 * Example usage:
 * ```
 * const CaretDownRightAccessory = useCreateMemoizedAccessory({
 *   icon: "caretDown",
 *   style: { opacity: 1 },
 * });
 * ```
 * https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md#rightaccessory-and-leftaccessory
 * @param color - Color of the icon.
 * @param containerStyle - Style for the container that holds the icon.
 * @param icon - Type of the icon to be used.
 * @param onPress - Function to be executed on icon press.
 * @param size - Size of the icon.
 * @param style - Style for the icon itself.
 */
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
