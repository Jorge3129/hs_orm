import {IColumn} from "./column";
import {IRelation} from "./relation";

export type ISchema = { [key: string]: IColumn }
export type IRelationSchema = { [key: string]: IRelation }

export interface ITable {
   name: string
   schema: ISchema
   relationSchema: IRelationSchema
   entity: Function
   primaryKey?: IColumn
   foreignKeys: []
   relations: IRelation[]
}
