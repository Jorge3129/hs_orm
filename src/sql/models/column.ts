import { IRelation } from "./relation"

export interface IColumn {
   type: any
   name: string
   nullable: boolean
   primary: boolean
   generated: boolean
   default: any
   relation?: IRelation
}
