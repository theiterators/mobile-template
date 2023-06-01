// Based on https://github.com/lawnstarter/react-native-picker-select
import { Picker as RNPicker } from "@react-native-picker/picker"
import React, { ComponentType, useEffect, useMemo, useRef } from "react"
import {
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

function isEqual(value1, value2) {
  if (value1 === value2) {
    return true
  }

  if (typeof value1 !== typeof value2) {
    return false
  }

  if (typeof value1 !== "object" || value1 === null || value2 === null) {
    return false
  }

  const keys1 = Object.keys(value1)
  const keys2 = Object.keys(value2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!isEqual(value1[key], value2[key])) {
      return false
    }
  }

  return true
}

const handlePlaceholder = ({ placeholder }) => {
  if (isEqual(placeholder, {})) {
    return []
  }
  return [placeholder]
}
const getSelectedItem = ({ items, key, value, index }) => {
  if (index) {
    return {
      selectedItem: items[index] || {},
      idx: index,
    }
  }

  let idx = items.findIndex((item) => {
    if (item.key && key) {
      return isEqual(item.key, key)
    }
    return isEqual(item.value, value)
  })
  if (idx === -1) {
    idx = 0
  }
  return {
    selectedItem: items[idx] || {},
    idx,
  }
}

export const Picker = ({
  onValueChange,
  items,
  value = undefined,
  placeholder = {
    label: "Select an item...",
    value: null,
    color: "#9EA0A4",
    key: "0",
  },
  disabled = false,
  itemKey = null,
  style = {},
  children = null,
  onOpen,
  useNativeAndroidPickerStyle = true,
  fixAndroidTouchableBug = false,
  doneText = "Done",
  onDonePress = null,
  onUpArrow = null,
  onDownArrow = null,
  onClose = null,
  modalProps = {},
  textInputProps = {},
  pickerProps = {},
  touchableDoneProps = {},
  touchableWrapperProps = {},
  Icon = null,
  InputAccessoryView = null,
}: {
  onValueChange: (itemValue: unknown, itemIndex: number) => void
  items: {
    label: string
    value: any
    inputLabel: string
    key: string | number
    color: string
  }[]
  value: any
  placeholder: {
    label: string
    value: any
    key: string | number
    color: string
  }
  disabled: boolean
  itemKey: string | number
  style: any
  children: any
  onOpen: () => void
  useNativeAndroidPickerStyle: boolean
  fixAndroidTouchableBug: boolean
  doneText: string
  onDonePress: () => void
  onUpArrow: () => void
  onDownArrow: () => void
  onClose: () => void
  modalProps: any
  textInputProps: any
  pickerProps: any
  touchableDoneProps: any
  touchableWrapperProps: any
  Icon: any
  InputAccessoryView: any
}) => {
  const textInputRef = useRef()

  const [stateItems, setStateItems] = React.useState(items)
  const [statePlaceholder, setStatePlaceholder] = React.useState(placeholder)
  const [stateSelectedIndex, setStateSelectedIndex] = React.useState(0)
  const [stateModalVisible, setStateModalVisible] = React.useState(false)
  const [stateAnimationType, setstateAnimationType] = React.useState(undefined)
  const [orientation, setOrientation] = React.useState("portrait")
  const [doneDepressed, setDoneDepressed] = React.useState(false)

  // useEffect(() => {
  //   setStateItems(items)
  // }, [items])

  // useEffect(() => {
  //   setStatePlaceholder(placeholder)
  // }, [placeholder])

  const pickerItems = useMemo(
    () =>
      handlePlaceholder({
        placeholder: statePlaceholder,
      }).concat(stateItems),
    [statePlaceholder, stateItems],
  )

  const { selectedItem } = useMemo(
    () =>
      getSelectedItem({
        items: pickerItems,
        key: itemKey,
        value: value,
        index: stateSelectedIndex,
      }),
    [pickerItems, itemKey, value, stateSelectedIndex],
  )

  const _onUpArrow = () => {
    _togglePicker(false, onUpArrow)
  }
  const _onDownArrow = () => {
    _togglePicker(false, onDownArrow)
  }

  const _onValueChange = (itemValue: unknown, itemIndex: number) => {
    onValueChange(itemValue, itemIndex)
    setStateSelectedIndex(itemIndex)
  }

  const _onOrientationChange = ({ nativeEvent }) => {
    setOrientation(nativeEvent.orientation)
  }

  const _getPlaceholderStyle = () => {
    if (!isEqual(placeholder, {}) && selectedItem.label === placeholder.label) {
      return {
        ...defaultStyles.placeholder,
        ...style.placeholder,
      }
    }
    return {}
  }

  const _triggerOpenCloseCallbacks = () => {
    if (!stateModalVisible && onOpen) {
      onOpen()
    }

    if (stateModalVisible && onClose) {
      onClose()
    }
  }

  const _togglePicker = (animate = false, postToggleCallback) => {
    if (disabled) {
      return
    }

    if (!stateModalVisible) {
      Keyboard.dismiss()
    }

    const animationType =
      modalProps && modalProps.animationType ? modalProps.animationType : "slide"

    _triggerOpenCloseCallbacks()

    setstateAnimationType(animate ? animationType : undefined)
    setStateModalVisible(!stateModalVisible)
    if (postToggleCallback) {
      postToggleCallback()
    }
  }

  const renderPickerItems = () => {
    return pickerItems.map((item) => {
      return (
        <RNPicker.Item
          key={item.key || item.label}
          color={item.color}
          label={item.label}
          value={item.value}
        />
      )
    })
  }

  const renderInputAccessoryView = () => {
    if (InputAccessoryView) {
      return <InputAccessoryView testID="custom_input_accessory_view" />
    }

    return (
      <View
        style={[defaultStyles.modalViewMiddle, style.modalViewMiddle]}
        testID="input_accessory_view"
      >
        <View style={[defaultStyles.chevronContainer, style.chevronContainer]}>
          <TouchableOpacity
            activeOpacity={onUpArrow ? 0.5 : 1}
            onPress={onUpArrow ? _onUpArrow : null}
          >
            <View
              style={[
                defaultStyles.chevron,
                style.chevron,
                defaultStyles.chevronUp,
                style.chevronUp,
                onUpArrow ? [defaultStyles.chevronActive, style.chevronActive] : {},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={onDownArrow ? 0.5 : 1}
            onPress={onDownArrow ? _onDownArrow : null}
          >
            <View
              style={[
                defaultStyles.chevron,
                style.chevron,
                defaultStyles.chevronDown,
                style.chevronDown,
                onDownArrow ? [defaultStyles.chevronActive, style.chevronActive] : {},
              ]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          testID="done_button"
          onPress={() => {
            _togglePicker(true, onDonePress)
          }}
          onPressIn={() => {
            setDoneDepressed(true)
          }}
          onPressOut={() => {
            setDoneDepressed(false)
          }}
          {...touchableDoneProps}
        >
          <View testID="needed_for_touchable">
            <Text
              allowFontScaling={false}
              testID="done_text"
              style={[
                defaultStyles.done,
                style.done,
                doneDepressed ? [defaultStyles.doneDepressed, style.doneDepressed] : {},
              ]}
            >
              {doneText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderIcon = () => {
    if (!Icon) {
      return null
    }

    return (
      <View style={[defaultStyles.iconContainer, style.iconContainer]} testID="icon_container">
        <Icon testID="icon" />
      </View>
    )
  }

  const renderTextInputOrChildren = () => {
    const containerStyle =
      Platform.OS === "ios" ? style.inputIOSContainer : style.inputAndroidContainer

    if (children) {
      return (
        <View pointerEvents="box-only" style={containerStyle}>
          {children}
        </View>
      )
    }

    return (
      <View pointerEvents="box-only" style={containerStyle}>
        <TextInput
          editable={false}
          ref={textInputRef}
          testID="text_input"
          value={selectedItem.inputLabel ? selectedItem.inputLabel : selectedItem.label}
          style={[
            Platform.OS === "ios" ? style.inputIOS : style.inputAndroid,
            _getPlaceholderStyle(),
          ]}
          {...textInputProps}
        />
        {renderIcon()}
      </View>
    )
  }

  const renderIOS = () => {
    return (
      <View style={[defaultStyles.viewContainer, style.viewContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          testID="ios_touchable_wrapper"
          onPress={() => {
            setStateModalVisible(true)
          }}
          {...touchableWrapperProps}
        >
          {renderTextInputOrChildren()}
        </TouchableOpacity>
        <Modal
          transparent
          animationType={stateAnimationType}
          supportedOrientations={["portrait", "landscape"]}
          testID="ios_modal"
          visible={stateModalVisible}
          onOrientationChange={_onOrientationChange}
          {...modalProps}
        >
          <TouchableOpacity
            style={[defaultStyles.modalViewTop, style.modalViewTop]}
            testID="ios_modal_top"
            onPress={() => {
              setStateModalVisible(true)
            }}
          />
          {renderInputAccessoryView()}
          <View
            style={[
              defaultStyles.modalViewBottom,
              { height: orientation === "portrait" ? 215 : 162 },
              style.modalViewBottom,
            ]}
          >
            <RNPicker
              selectedValue={selectedItem.value}
              testID="ios_picker"
              onValueChange={_onValueChange}
              {...pickerProps}
            >
              {renderPickerItems()}
            </RNPicker>
          </View>
        </Modal>
      </View>
    )
  }

  const renderAndroidHeadless = () => {
    const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
      () => (fixAndroidTouchableBug ? View : TouchableOpacity),
      [fixAndroidTouchableBug],
    )

    return (
      <Wrapper
        activeOpacity={1}
        testID="android_touchable_wrapper"
        onPress={onOpen}
        {...touchableWrapperProps}
      >
        <View style={style.headlessAndroidContainer}>
          {renderTextInputOrChildren()}
          <RNPicker
            enabled={!disabled}
            selectedValue={selectedItem.value}
            testID="android_picker_headless"
            style={[
              Icon ? { backgroundColor: "transparent" } : {}, // to hide native icon
              defaultStyles.headlessAndroidPicker,
              style.headlessAndroidPicker,
            ]}
            onValueChange={_onValueChange}
            {...pickerProps}
          >
            {renderPickerItems()}
          </RNPicker>
        </View>
      </Wrapper>
    )
  }

  const renderAndroidNativePickerStyle = () => {
    return (
      <View style={[defaultStyles.viewContainer, style.viewContainer]}>
        <RNPicker
          enabled={!disabled}
          selectedValue={selectedItem.value}
          testID="android_picker"
          style={[
            Icon ? { backgroundColor: "transparent" } : {}, // to hide native icon
            style.inputAndroid,
            _getPlaceholderStyle(),
          ]}
          onValueChange={_onValueChange}
          {...pickerProps}
        >
          {renderPickerItems()}
        </RNPicker>
        {renderIcon()}
      </View>
    )
  }

  if (Platform.OS === "ios") {
    return renderIOS()
  }

  if (children || !useNativeAndroidPickerStyle) {
    return renderAndroidHeadless()
  }

  return renderAndroidNativePickerStyle()
}

export const defaultStyles = StyleSheet.create({
  chevron: {
    backgroundColor: "transparent",
    borderColor: "#a1a1a1",
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    height: 15,
    width: 15,
  },
  chevronActive: {
    borderColor: "#007aff",
  },
  chevronContainer: {
    flexDirection: "row",
  },
  chevronDown: {
    marginLeft: 22,
    transform: [{ translateY: -5 }, { rotate: "135deg" }],
  },
  chevronUp: {
    marginLeft: 11,
    transform: [{ translateY: 4 }, { rotate: "-45deg" }],
  },
  done: {
    color: "#007aff",
    fontSize: 17,
    fontWeight: "600",
    paddingRight: 11,
    paddingTop: 1,
  },
  doneDepressed: {
    fontSize: 19,
  },
  headlessAndroidPicker: {
    color: "transparent",
    height: "100%",
    opacity: 0,
    position: "absolute",
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
  },
  modalViewBottom: {
    backgroundColor: "#d0d4da",
    justifyContent: "center",
  },
  modalViewMiddle: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderTopColor: "#dedede",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 2,
  },
  modalViewTop: {
    flex: 1,
  },
  placeholder: {
    color: "#c7c7cd",
  },
  viewContainer: {
    alignSelf: "stretch",
  },
})
