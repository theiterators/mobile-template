import { TUser } from "./userType"

export type TProject = {
  archived: boolean
  createdAt: string
  createdBy: string
  id: string
  modifiedAt: string
  modifiedBy: string
  name: string
  organizationId: string
  type: string
  members: TUser[]
}
