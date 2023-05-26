import { FieldValues, RegisterOptions } from "react-hook-form"

import { translate } from "../../i18n"
import { EMAIL_REG_EXP } from "../helpers"

export const email: RegisterOptions<FieldValues, string> = {
  pattern: {
    value: EMAIL_REG_EXP,
    message: translate("errors.invalidEmail"),
  },
}
