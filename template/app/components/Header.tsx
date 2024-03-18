import React, { ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

import { isRTL, translate } from "../i18n"
import { ACTIVE_OPACITY, colors, spacing } from "../theme"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../utils/hooks/useSafeAreaInsetsStyle"

import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"
import { DEFAULT_HEADER_HEIGHT } from "app/common/constants"

export interface HeaderProps {
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  leftActionTestID?: string
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: TextProps["text"]
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TextProps["tx"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptions?: TextProps["txOptions"]
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps["onPress"]
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps["onPress"]
  rightActionTestID?: string
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: TextProps["text"]
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TextProps["tx"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptions?: TextProps["txOptions"]
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * TestID used for testing purposes
   * */
  testID?: string
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps["text"]
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: "center" | "flex"

  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>

  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps["tx"]

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps["txOptions"]
}

interface HeaderActionProps {
  ActionComponent?: ReactElement
  backgroundColor?: string
  icon?: IconTypes
  iconColor?: string
  onPress?: TouchableOpacityProps["onPress"]
  testID?: string
  text?: TextProps["text"]
  tx?: TextProps["tx"]
  txOptions?: TextProps["txOptions"]
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Header/}
 * @param {HeaderProps} props - The props for the `Header` component.
 * @returns {JSX.Element} The rendered `Header` component.
 */
export function Header(props: HeaderProps): JSX.Element {
  const {
    backgroundColor = colors.background,
    containerStyle: $containerStyleOverride,
    LeftActionComponent,
    leftActionTestID,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightActionTestID,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    rightTxOptions,
    safeAreaEdges = ["top"],
    style: $styleOverride,
    testID,
    title,
    titleContainerStyle: $titleContainerStyleOverride,
    titleMode = "center",
    titleStyle: $titleStyleOverride,
    titleTx,
    titleTxOptions,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const titleContent = titleTx ? translate(titleTx, titleTxOptions) : title

  return (
    <View
      style={[$container, $containerInsets, { backgroundColor }, $containerStyleOverride]}
      testID={testID}
    >
      <View style={[$wrapper, $styleOverride]}>
        <HeaderAction
          ActionComponent={LeftActionComponent}
          backgroundColor={backgroundColor}
          icon={leftIcon}
          iconColor={leftIconColor}
          testID={leftActionTestID}
          text={leftText}
          tx={leftTx}
          txOptions={leftTxOptions}
          onPress={onLeftPress}
        />

        {!!titleContent && (
          <View
            pointerEvents="none"
            style={[
              titleMode === "center" && $titleWrapperCenter,
              titleMode === "flex" && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
          >
            <Text
              size="md"
              style={[$title, $titleStyleOverride]}
              text={titleContent}
              weight="medium"
            />
          </View>
        )}

        <HeaderAction
          ActionComponent={RightActionComponent}
          backgroundColor={backgroundColor}
          icon={rightIcon}
          iconColor={rightIconColor}
          testID={rightActionTestID}
          text={rightText}
          tx={rightTx}
          txOptions={rightTxOptions}
          onPress={onRightPress}
        />
      </View>
    </View>
  )
}

function HeaderAction(props: HeaderActionProps) {
  const {
    ActionComponent,
    backgroundColor,
    icon,
    iconColor,
    onPress,
    testID,
    text,
    tx,
    txOptions,
  } = props

  const content = tx ? translate(tx, txOptions) : text

  if (ActionComponent) return ActionComponent

  if (content) {
    return (
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        disabled={!onPress}
        style={[$actionTextContainer, { backgroundColor }]}
        testID={testID}
        onPress={onPress}
      >
        <Text size="md" style={$actionText} text={content} weight="medium" />
      </TouchableOpacity>
    )
  }

  if (icon) {
    return (
      <Icon
        color={iconColor}
        containerStyle={[$actionIconContainer, { backgroundColor }]}
        icon={icon}
        size={24}
        style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
        onPress={onPress}
      />
    )
  }

  return <View style={[$actionFillerContainer, { backgroundColor }]} />
}

const $wrapper: ViewStyle = {
  height: DEFAULT_HEADER_HEIGHT,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $container: ViewStyle = {
  width: "100%",
}

const $title: TextStyle = {
  textAlign: "center",
}

const $actionTextContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.medium,
  zIndex: 2,
}

const $actionText: TextStyle = {
  color: colors.tint,
}

const $actionIconContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.medium,
  zIndex: 2,
}

const $actionFillerContainer: ViewStyle = {
  width: 16,
}

const $titleWrapperCenter: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  position: "absolute",
  paddingHorizontal: spacing.huge,
  zIndex: 1,
}

const $titleWrapperFlex: ViewStyle = {
  justifyContent: "center",
  flexGrow: 1,
}
