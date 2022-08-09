import {IColumn} from "./models/column";
import {ISchema} from "./models/table";

export const createSchema = (columns: IColumn[]): ISchema => {
   return columns.reduce((acc, column) => {
      return {...acc, [column.name]: column}
   }, {} as ISchema)
}
