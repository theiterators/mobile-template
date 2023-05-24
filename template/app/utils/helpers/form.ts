export const EMAIL_REG_EXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const REG_EXP_SPESIAL_CHARACTERS = /[@:;“<>?/!`~=#$^&*()%]/g

export const isFormFilled = (formObj: object): boolean => {
  for (const key in formObj) {
    if (typeof formObj[key] === "object") {
      return isFormFilled(formObj[key])
    }
    if (!formObj[key]) {
      return false
    }
  }
  return true
}
