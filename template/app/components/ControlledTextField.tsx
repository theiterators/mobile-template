import React, { forwardRef, MutableRefObject } from "react"
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { TextInput } from "react-native"

import { TextField, TextFieldProps } from "."

interface Props<T extends FieldValues = FieldValues>
  extends Omit<TextFieldProps, "onChangeText" | "value" | "helper" | "defaultValue"> {
  control: Control<T>
  controlFieldValue?: (text: string) => string
  name: Path<T>
  rules?: RegisterOptions
}

const forwardedTextField = <T extends FieldValues>(
  { control, controlFieldValue, name, rules, ...restProps }: Props<T>,
  ref: MutableRefObject<TextInput>,
) => {
  return (
    <Controller<T>
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ref: hookRef, value }, fieldState: { error } }) => {
        return (
          <TextField
            helper={error?.message}
            value={value}
            ref={(reference) => {
              hookRef(reference)
              if (ref) {
                ref.current = reference
              }
            }}
            onChangeText={(text) => {
              onChange(controlFieldValue ? controlFieldValue(text) : text)
            }}
            {...restProps}
            {...(error && { status: "error" })}
          />
        )
      }}
    />
  )
}

export const ControlledTextField = forwardRef(forwardedTextField) as <T>(
  props: Props<T> & { ref?: MutableRefObject<TextInput> },
) => ReturnType<typeof forwardedTextField>
