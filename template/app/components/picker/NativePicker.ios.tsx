import React, { FC, useMemo } from "react"
import { ActionSheetIOS, Pressable } from "react-native"

import { translate } from "app/i18n"
import { IPickerItem } from "./Picker"

interface NativeIOSPickerProps {
  children: React.ReactNode
  onValueChange: (itemValue: string) => void
  data: IPickerItem[]
}

interface IConfiguration {
  cancelButtonIndex?: number
  options: string[]
}

export const NativeIOSPicker: FC<NativeIOSPickerProps> = ({ children, onValueChange, data }) => {
  const onSelect = (index: number) => {
    if (index >= data.length) {
      return
    }
    const item = data[index]
    onValueChange(item.value)
  }

  const configuration: IConfiguration = useMemo(
    () => ({
      userInterfaceStyle: "dark",
      cancelButtonIndex: data.length,
      options: [...data.map((item) => item.label || `${item.value}`), translate("common.cancel")],
    }),
    [data],
  )

  const renderSelector = () => {
    return ActionSheetIOS.showActionSheetWithOptions(configuration, onSelect)
  }

  return <Pressable onPress={renderSelector}>{children}</Pressable>
}
