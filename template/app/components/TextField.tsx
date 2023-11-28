import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { isRTL, translate } from "../i18n"
import { colors, spacing, typography } from "../theme"

import { Text, TextProps } from "./Text"
import { DEFAULT_FIELD_HEIGHT_SIZE, KEYBOARD_AVOIDING_VIEW_OFFSET } from "app/common/constants"

export interface TextFieldAccessoryProps {
  editable: boolean
  multiline: boolean
  status: TextFieldProps["status"]
  style: StyleProp<any>
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
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
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<Omit<ViewStyle, "height">>
  /**
   * This parameter determines how high the field should be positioned above the opened keyboard.
   */
  keyboardAvoidingViewOffset?: number
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
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
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * The field's height should be passed through this parameter.
   * The height coming from the style will be overwritten.
   */
  fieldHeight?: number
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    containerStyle: $containerStyleOverride,
    helper,
    HelperTextProps,
    helperTx,
    helperTxOptions,
    inputWrapperStyle: $inputWrapperStyleOverride,
    label,
    LabelTextProps,
    labelTx,
    labelTxOptions,
    LeftAccessory,
    placeholder,
    placeholderTx,
    placeholderTxOptions,
    RightAccessory,
    status,
    fieldHeight = DEFAULT_FIELD_HEIGHT_SIZE,
    keyboardAvoidingViewOffset = KEYBOARD_AVOIDING_VIEW_OFFSET,
    style: $inputStyleOverride,
    ...TextInputProps
  } = props
  const input = useRef<TextInput>()

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === "error" && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
    { height: fieldHeight },
  ]

  const $inputStyles: StyleProp<TextStyle>[] = [
    $inputStyle,
    disabled && { color: colors.textDim },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
    { height: fieldHeight + keyboardAvoidingViewOffset },
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  function focusInput() {
    if (disabled) return

    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current)

  return (
    <TouchableOpacity
      accessibilityState={{ disabled }}
      accessible={false}
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
    >
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            editable={!disabled}
            multiline={TextInputProps.multiline}
            status={status}
            style={$leftAccessoryStyle}
          />
        )}

        <TextInput
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          ref={input}
          textAlignVertical="top"
          underlineColorAndroid={colors.transparent}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            editable={!disabled}
            multiline={TextInputProps.multiline}
            status={status}
            style={$rightAccessoryStyle}
          />
        )}
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
    </TouchableOpacity>
  )
})

const $labelStyle: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "center",
  textAlignVertical: "center",
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.extraSmall,
  marginHorizontal: spacing.small,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.extraSmall,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
