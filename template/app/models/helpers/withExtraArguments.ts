import { IStateTreeNode, getEnv } from "mobx-state-tree"
import { ExtraArguments } from "./useStores"

export const withExtraArguments = <T extends IStateTreeNode>(mstInstance: T) => ({
  get extra() {
    return getEnv<ExtraArguments>(mstInstance)
  },
})
