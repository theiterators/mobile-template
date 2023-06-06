import { TProject } from "app/common/types/projectType"
import { format, parseISO } from "date-fns"
import { makeAutoObservable } from "mobx"

export class ProjectLocalStore {
  item: TProject

  constructor(item: TProject) {
    makeAutoObservable(this)
    this.item = item
  }

  get date() {
    if (!this.item) {
      return ""
    }
    return format(parseISO(this.item.createdAt), "dd.MM.yyyy")
  }
}
