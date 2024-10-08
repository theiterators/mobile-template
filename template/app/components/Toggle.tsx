import React, { ComponentType, FC, useMemo } from "react"
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  SwitchProps,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

import { colors, spacing } from "../theme"

import { iconRegistry, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

type Variants = "checkbox" | "switch" | "radio"

interface BaseToggleProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * If false, input is not editable. The default value is true.
   */
  editable?: TextInputProps["editable"]
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   * This gives the inputs their inner characteristics and "on" background-color.
   */
  inputInnerStyle?: ViewStyle
  /**
   * Optional input wrapper style override.
   * This gives the inputs their size, shape, "off" background-color, and outer border.
   */
  inputOuterStyle?: ViewStyle
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * The position of the label relative to the action component.
   * Default: right
   */
  labelPosition?: "left" | "right"
  /**
   * Style overrides for label text.
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"]
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean
  /**
   * The variant of the toggle.
   * Options: "checkbox", "switch", "radio"
   * Default: "checkbox"
   */
  variant?: unknown
}

interface CheckboxToggleProps extends BaseToggleProps {
  /**
   * Checkbox-only prop that changes the icon used for the "on" state.
   */
  checkboxIcon?: IconTypes
  /**
   * Optional style prop that affects the Image component.
   */
  inputDetailStyle?: ImageStyle
  variant?: "checkbox"
}

interface RadioToggleProps extends BaseToggleProps {
  /**
   * Optional style prop that affects the dot View.
   */
  inputDetailStyle?: ViewStyle
  variant?: "radio"
}

interface SwitchToggleProps extends BaseToggleProps {
  /**
   * Optional style prop that affects the knob View.
   * Note: `width` and `height` rules should be points (numbers), not percentages.
   */
  inputDetailStyle?: Omit<ViewStyle, "width" | "height"> & { height?: number; width?: number }
  /**
   * Switch-only prop that adds a text/icon label for on/off states.
   */
  switchAccessibilityMode?: "text" | "icon"
  variant?: "switch"
}

export type ToggleProps = CheckboxToggleProps | RadioToggleProps | SwitchToggleProps

interface ToggleInputProps {
  checkboxIcon?: CheckboxToggleProps["checkboxIcon"]
  detailStyle: Omit<ViewStyle & ImageStyle, "overflow">
  disabled: boolean
  innerStyle: ViewStyle
  on: boolean
  outerStyle: ViewStyle
  status: BaseToggleProps["status"]
  switchAccessibilityMode?: SwitchToggleProps["switchAccessibilityMode"]
}

/**
 * Renders a boolean input.
 * This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Toggle/}
 * @param {ToggleProps} props - The props for the `Toggle` component.
 * @returns {JSX.Element} The rendered `Toggle` component.
 */
export function Toggle(props: ToggleProps): JSX.Element {
  const {
    containerStyle: $containerStyleOverride,
    editable = true,
    helper,
    HelperTextProps,
    helperTx,
    helperTxOptions,
    inputWrapperStyle: $inputWrapperStyleOverride,
    labelPosition = "right",
    onPress,
    onValueChange,
    status,
    value,
    variant = "checkbox",
    ...WrapperProps
  } = props

  const { switchAccessibilityMode } = props as SwitchToggleProps
  const { checkboxIcon } = props as CheckboxToggleProps

  const disabled = editable === false || status === "disabled" || props.disabled

  const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
    () => (disabled ? View : TouchableOpacity),
    [disabled],
  )
  const ToggleInput = useMemo(() => ToggleInputs[variant] || (() => null), [variant])

  const $containerStyles = [$containerStyleOverride]
  const $inputWrapperStyles = [$inputWrapper, $inputWrapperStyleOverride]
  const $helperStyles = [
    $helper,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  /**
   * @param {GestureResponderEvent} e - The event object.
   */
  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  return (
    <Wrapper
      accessibilityRole={variant}
      accessibilityState={{ checked: value, disabled }}
      activeOpacity={1}
      {...WrapperProps}
      style={$containerStyles}
      onPress={handlePress}
    >
      <View style={$inputWrapperStyles}>
        {labelPosition === "left" && <FieldLabel {...props} labelPosition={labelPosition} />}

        <ToggleInput
          checkboxIcon={checkboxIcon}
          detailStyle={props.inputDetailStyle}
          disabled={disabled}
          innerStyle={props.inputInnerStyle}
          on={value}
          outerStyle={props.inputOuterStyle}
          status={status}
          switchAccessibilityMode={switchAccessibilityMode}
        />

        {labelPosition === "right" && <FieldLabel {...props} labelPosition={labelPosition} />}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </Wrapper>
  )
}

const ToggleInputs: Record<Variants, FC<ToggleInputProps>> = {
  checkbox: Checkbox,
  switch: Switch,
  radio: Radio,
}

/**
 * @param {ToggleInputProps} props - The props for the `Checkbox` component.
 * @returns {JSX.Element} The rendered `Checkbox` component.
 */
function Checkbox(props: ToggleInputProps): JSX.Element {
  const {
    checkboxIcon,
    detailStyle: $detailStyleOverride,
    disabled,
    innerStyle: $innerStyleOverride,
    on,
    outerStyle: $outerStyleOverride,
    status,
  } = props

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const iconTintColor = [
    disabled && colors.palette.neutral600,
    status === "error" && colors.error,
    colors.palette.accent100,
  ].filter(Boolean)[0]

  return (
    <View
      style={[
        $inputOuterVariants.checkbox,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $checkboxInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <Image
          source={iconRegistry[checkboxIcon] || iconRegistry.check}
          style={[$checkboxDetail, { tintColor: iconTintColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  )
}

/**
 * @param {ToggleInputProps} props - The props for the `Radio` component.
 * @returns {JSX.Element} The rendered `Radio` component.
 */
function Radio(props: ToggleInputProps): JSX.Element {
  const {
    detailStyle: $detailStyleOverride,
    disabled,
    innerStyle: $innerStyleOverride,
    on,
    outerStyle: $outerStyleOverride,
    status,
  } = props

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.neutral100,
  ].filter(Boolean)[0]

  const dotBackgroundColor = [
    disabled && colors.palette.neutral600,
    status === "error" && colors.error,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  return (
    <View
      style={[
        $inputOuterVariants.radio,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $radioInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <View
          style={[$radioDetail, { backgroundColor: dotBackgroundColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  )
}

/**
 * @param {ToggleInputProps} props - The props for the `Switch` component.
 * @returns {JSX.Element} The rendered `Switch` component.
 */
function Switch(props: ToggleInputProps): JSX.Element {
  const {
    detailStyle: $detailStyleOverride,
    disabled,
    innerStyle: $innerStyleOverride,
    on,
    outerStyle: $outerStyleOverride,
    status,
  } = props

  const knobSizeFallback = 2

  const knobWidth = [$detailStyleOverride?.width, $switchDetail?.width, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const knobHeight = [$detailStyleOverride?.height, $switchDetail?.height, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral300,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === "error" && colors.error,
        disabled && colors.palette.neutral600,
        colors.palette.neutral100,
      ].filter(Boolean)[0]
    } else {
      return [
        $innerStyleOverride?.backgroundColor,
        disabled && colors.palette.neutral600,
        status === "error" && colors.error,
        colors.palette.neutral200,
      ].filter(Boolean)[0]
    }
  })()

  const $animatedSwitchKnob = useAnimatedStyle(() => {
    const offsetLeft = ($innerStyleOverride?.paddingStart ||
      $innerStyleOverride?.paddingLeft ||
      $switchInner?.paddingStart ||
      $switchInner?.paddingLeft ||
      0) as number

    const offsetRight = ($innerStyleOverride?.paddingEnd ||
      $innerStyleOverride?.paddingRight ||
      $switchInner?.paddingEnd ||
      $switchInner?.paddingRight ||
      0) as number

    const start = withTiming(on ? "100%" : "0%")
    const marginStart = withTiming(on ? -(knobWidth || 0) - offsetRight : 0 + offsetLeft)

    return { start, marginStart }
  }, [on, knobWidth])

  return (
    <View
      style={[
        $inputOuterVariants.switch,
        { backgroundColor: offBackgroundColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $switchInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <Animated.View
        style={[
          $switchDetail,
          $detailStyleOverride,
          $animatedSwitchKnob,
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor },
        ]}
      />
    </View>
  )
}

/**
 * @param {ToggleInputProps & { role: "on" | "off" }} props - The props for the `SwitchAccessibilityLabel` component.
 * @returns {JSX.Element} The rendered `SwitchAccessibilityLabel` component.
 */
function SwitchAccessibilityLabel(props: ToggleInputProps & { role: "on" | "off" }): JSX.Element {
  const { detailStyle, disabled, innerStyle, on, role, status, switchAccessibilityMode } = props

  if (!switchAccessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const $switchAccessibilityStyle: StyleProp<ViewStyle> = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ]

  const color = (function () {
    if (disabled) return colors.palette.neutral600
    if (status === "error") return colors.error
    if (!on) return innerStyle?.backgroundColor || colors.palette.secondary500
    return detailStyle?.backgroundColor || colors.palette.neutral100
  })()

  return (
    <View style={$switchAccessibilityStyle}>
      {switchAccessibilityMode === "text" && shouldLabelBeVisible && (
        <View
          style={[
            role === "on" && $switchAccessibilityLine,
            role === "on" && { backgroundColor: color },
            role === "off" && $switchAccessibilityCircle,
            role === "off" && { borderColor: color },
          ]}
        />
      )}

      {switchAccessibilityMode === "icon" && shouldLabelBeVisible && (
        <Image
          source={role === "off" ? iconRegistry.hidden : iconRegistry.view}
          style={[$switchAccessibilityIcon, { tintColor: color }]}
        />
      )}
    </View>
  )
}

/**
 * @param {BaseToggleProps} props - The props for the `FieldLabel` component.
 * @returns {JSX.Element} The rendered `FieldLabel` component.
 */
function FieldLabel(props: BaseToggleProps): JSX.Element {
  const {
    label,
    labelPosition,
    labelStyle: $labelStyleOverride,
    LabelTextProps,
    labelTx,
    labelTxOptions,
    status,
  } = props

  if (!label && !labelTx && !LabelTextProps?.children) return null

  const $labelStyle = [
    $label,
    status === "error" && { color: colors.error },
    labelPosition === "right" && $labelRight,
    labelPosition === "left" && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ]

  return (
    <Text
      preset="formLabel"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      style={$labelStyle}
    />
  )
}

const $inputWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
}

const $inputOuterVariants: Record<Variants, StyleProp<ViewStyle>> = {
  checkbox: [$inputOuterBase, { borderRadius: 4 }],
  radio: [$inputOuterBase, { borderRadius: 12 }],
  switch: [$inputOuterBase, { height: 32, width: 56, borderRadius: 16, borderWidth: 0 }],
}

const $checkboxInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $checkboxDetail: ImageStyle = {
  width: 20,
  height: 20,
  resizeMode: "contain",
}

const $radioInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $radioDetail: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
}

const $switchInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  borderColor: colors.transparent,
  overflow: "hidden",
  position: "absolute",
  paddingStart: 4,
  paddingEnd: 4,
}

const $switchDetail: SwitchToggleProps["inputDetailStyle"] = {
  borderRadius: 12,
  position: "absolute",
  width: 24,
  height: 24,
}

const $helper: TextStyle = {
  marginTop: spacing.extraSmall,
}

const $label: TextStyle = {
  flex: 1,
}

const $labelRight: TextStyle = {
  marginStart: spacing.medium,
}

const $labelLeft: TextStyle = {
  marginEnd: spacing.medium,
}

const $switchAccessibility: TextStyle = {
  width: "40%",
  justifyContent: "center",
  alignItems: "center",
}

const $switchAccessibilityIcon: ImageStyle = {
  width: 14,
  height: 14,
  resizeMode: "contain",
}

const $switchAccessibilityLine: ViewStyle = {
  width: 2,
  height: 12,
}

const $switchAccessibilityCircle: ViewStyle = {
  borderWidth: 2,
  width: 12,
  height: 12,
  borderRadius: 6,
}
