import { Control, FieldValues, useWatch } from "react-hook-form"

import { isFormFilled } from "../helpers"

export const useFormComplete = <T extends FieldValues>(control: Control<T>) => {
  const formFields = useWatch({ control })
  return { complete: isFormFilled(formFields), formFields }
}
