import {IColumn} from "./column";

export type ISchema = { [key: string]: IColumn }

export interface ITable {
   name: string
   schema: ISchema
   rows: Object[]
}
