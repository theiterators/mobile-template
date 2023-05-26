import { addMiddleware } from "mobx-state-tree"
import { RootStore } from "../RootStore"
import { DATA_STATUS } from "../../common/types"
import { reportCrash } from "../../services/reports/crashReporting"

export const catchErrorMiddleware = (rootStore: RootStore) =>
  addMiddleware(
    rootStore,
    (call, next, abort) => {
      if (call.type === "flow_throw") {
        call.args.length && reportCrash(call.args[0])
        if ("setProp" in call.context && "dataStatus" in call.context) {
          call.context.setProp("dataStatus", DATA_STATUS.REJECTED)
        }
        return abort("Error")
      }
      next(call)
    },
    true,
  )
