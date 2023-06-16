import React from "react"
import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { translate } from "../i18n"
import { spacing } from "../theme"

import { Button, ButtonProps } from "./Button"
import { Text, TextProps } from "./Text"

interface EmptyStateProps {
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps,
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps,
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps,
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">,
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: TextProps["text"],
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: ButtonProps["onPress"],
  /**
   * Style overrides for button.
   */
  buttonStyle?: ButtonProps["style"],
  /**
   * Style overrides for button text.
   */
  buttonTextStyle?: ButtonProps["textStyle"],
  /**
   * Button text which is looked up via i18n.
   */
  buttonTx?: TextProps["tx"],
  /**
   * Optional button options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  buttonTxOptions?: TextProps["txOptions"],
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>,
  /**
   * Content text which is looked up via i18n.
   */
  contentTx?: TextProps["tx"],
  /**
   * Optional content options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  contentTxOptions?: TextProps["txOptions"],
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"],
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>,
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: TextProps["tx"],
  /**
   * Optional heading options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  headingTxOptions?: TextProps["txOptions"],
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"],
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>,
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: keyof typeof EmptyStatePresets,
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
}

const EmptyStatePresets = {
  generic: {
    heading: translate("emptyStateComponent.generic.heading"),
    content: translate("emptyStateComponent.generic.content"),
    button: translate("emptyStateComponent.generic.button"),
  },
} as const

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-EmptyState.md)
 */
export function EmptyState(props: EmptyStateProps) {
  const preset = EmptyStatePresets[props.preset] ? EmptyStatePresets[props.preset] : undefined

  const {
    button = preset?.button,
    buttonOnPress,
    ButtonProps,
    buttonStyle: $buttonStyleOverride,
    buttonTextStyle: $buttonTextStyleOverride,
    buttonTx,
    buttonTxOptions,
    content = preset?.content,
    contentStyle: $contentStyleOverride,
    ContentTextProps,
    contentTx,
    contentTxOptions,
    heading = preset?.heading,
    headingStyle: $headingStyleOverride,
    HeadingTextProps,
    headingTx,
    headingTxOptions,
    ImageProps,
    imageSource,
    imageStyle: $imageStyleOverride,
    style: $containerStyleOverride,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!(heading || headingTx)
  const isContentPresent = !!(content || contentTx)
  const isButtonPresent = !!(button || buttonTx)

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    $heading,
    isImagePresent && { marginTop: spacing.tiny },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.tiny },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    $content,
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.tiny },
    isButtonPresent && { marginBottom: spacing.tiny },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.extraLarge },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {isImagePresent && <Image source={imageSource} {...ImageProps} style={$imageStyles} />}

      {isHeadingPresent && (
        <Text
          preset="subheading"
          text={heading}
          tx={headingTx}
          txOptions={headingTxOptions}
          {...HeadingTextProps}
          style={$headingStyles}
        />
      )}

      {isContentPresent && (
        <Text
          text={content}
          tx={contentTx}
          txOptions={contentTxOptions}
          {...ContentTextProps}
          style={$contentStyles}
        />
      )}

      {isButtonPresent && (
        <Button
          text={button}
          textStyle={$buttonTextStyleOverride}
          tx={buttonTx}
          txOptions={buttonTxOptions}
          onPress={buttonOnPress}
          {...ButtonProps}
          style={$buttonStyles}
        />
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: "center" }
const $heading: TextStyle = { textAlign: "center", paddingHorizontal: spacing.large }
const $content: TextStyle = { textAlign: "center", paddingHorizontal: spacing.large }
