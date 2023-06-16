import React from "react"
import { Platform } from "react-native"

import { NativeAndroidPicker } from "./NativePicker.android"
import { NativeIOSPicker } from "./NativePicker.ios"

export interface IPickerItem {
  label: string
  value: string
}

interface PickerProps {
  /* `children: React.ReactNode` is defining a prop called `children` that can accept any valid React
  node as its value. This prop is used to pass any additional content or components that should be
  rendered inside the `Picker` component. The `children` prop is a special prop in React that allows
  components to be composed and nested within each other. */
  children: React.ReactNode,

  /* `data: IPickerItem[]` is defining a prop called `data` with a type of an array of objects that
  implement the `IPickerItem` interface. This prop is used to pass an array of items to be displayed
  in the picker component. Each item in the array should have a `label` and a `value` property, as
  defined in the `IPickerItem` interface. */
  data: IPickerItem[]

  /* `onValueChange: (value: string) => void` is defining a prop called `onValueChange` with a function
  type that takes a single argument of type `string` and returns nothing (`void`). This prop is used
  to pass a function that will be called when the selected value in the picker component changes.
  The function will receive the new selected value as its argument. */
  onValueChange: (value: string) => void,

  /* `selectedValue: string` is defining a prop called `selectedValue` with a type of `string`. This prop is used to
  determine the currently selected value in the picker component. */
  selectedValue: string
}

export const Picker = ({ children, data, onValueChange, selectedValue }: PickerProps) => {
  return Platform.OS === "android" ? (
    <NativeAndroidPicker data={data} selectedValue={selectedValue} onValueChange={onValueChange}>
      {children}
    </NativeAndroidPicker>
  ) : (
    <NativeIOSPicker data={data} onValueChange={onValueChange}>
      {children}
    </NativeIOSPicker>
  )
}
