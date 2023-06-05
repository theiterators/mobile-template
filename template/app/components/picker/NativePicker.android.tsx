import React, { FC } from "react"
import { TextStyle, View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { observer } from "mobx-react-lite"

import { colors } from "app/theme"
import { IPickerItem } from "./Picker"

interface NativeAndroidPickerProps {
  children: React.ReactNode
  onValueChange: (itemValue: string) => void
  data: IPickerItem[]
  selectedValue: string
}

export const NativeAndroidPicker: FC<NativeAndroidPickerProps> = observer(
  ({ children, onValueChange, data, selectedValue, ...pickerProps }) => {
    return (
      <>
        <View pointerEvents="box-only">{children}</View>
        <Picker
          selectedValue={selectedValue}
          style={$inputAndroid}
          onValueChange={onValueChange}
          {...pickerProps}
        >
          {data.map(({ label, value }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </>
    )
  },
)

const $inputAndroid: TextStyle = {
  backgroundColor: colors.transparent,
  color: colors.transparent,
  height: "100%",
  opacity: 0,
  position: "absolute",
  width: "100%",
}
