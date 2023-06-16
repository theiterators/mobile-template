import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"

import { colors, spacing, typography } from "../theme"

import { LoadingSpinner } from "./LoadingSpinner"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  pressableState: PressableStateCallbackType,
  style: StyleProp<any>
}

export interface ButtonProps extends PressableProps {
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>,
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>,
  /**
   * Children components.
   */
  children?: React.ReactNode,
  /**
   * Indicates whether the component is disabled.
   */
  disabled?: boolean,
  /**
   * Indicates whether the component is in a loading state.
   */
  isLoading?: boolean,
  /**
   * One of the different types of button presets.
   */
  preset?: Presets,
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>,
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>,

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"],
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>,
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"],
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {
  const {
    children,
    isLoading,
    LeftAccessory,
    pressedStyle: $pressedViewStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    RightAccessory,
    style: $viewStyleOverride,
    text,
    textStyle: $textStyleOverride,
    tx,
    txOptions,
    ...rest
  } = props

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  function $viewStyle({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle({ pressed }) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <Pressable accessibilityRole="button" style={$viewStyle} {...rest}>
      {(state) => (
        <>
          {!!LeftAccessory && <LeftAccessory pressableState={state} style={$leftAccessoryStyle} />}

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Text style={$textStyle(state)} text={text} tx={tx} txOptions={txOptions}>
              {children}
            </Text>
          )}

          {!!RightAccessory && (
            <RightAccessory pressableState={state} style={$rightAccessoryStyle} />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.small,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.extraSmall, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.extraLarge, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.neutral100,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.neutral300 }] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    { backgroundColor: colors.palette.neutral800 },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, { color: colors.palette.neutral100 }],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.neutral200 },
  filled: { backgroundColor: colors.palette.neutral400 },
  reversed: { backgroundColor: colors.palette.neutral700 },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 },
}
