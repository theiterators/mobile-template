import type { Control, FieldValues } from "react-hook-form"
import {
  DeepPartial,
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  ValidationMode,
} from "react-hook-form"

export type UseAppFormParams<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>
  mode?: keyof ValidationMode
}

export type UseAppFormResult<T extends FieldValues = FieldValues> = {
  control: Control<T>
  formState: FormState<T>
  handleSubmit: UseFormHandleSubmit<T>,
  isEmptyFields: boolean,
  reset: UseFormReset<T>
  setFocus: UseFormSetFocus<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
}

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = "onSubmit",
}: UseAppFormParams<T>): UseAppFormResult<T> => {
  const { control, formState, handleSubmit, reset, setFocus, setValue, watch } = useForm<T>({
    defaultValues,
    mode,
  })
  const isEmptyFields =
    Object.keys(formState.dirtyFields).length !== Object.keys(defaultValues).length

  return {
    control,
    formState,
    isEmptyFields,
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    reset,
    setValue,
    watch,
    setFocus,
  }
}

export { useAppForm }
