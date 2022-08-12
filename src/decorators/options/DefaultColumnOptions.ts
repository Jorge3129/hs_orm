import {IColumn} from "../../sql/models/column";
import {ColumnOptions} from "./ColumnOptions";
import {ObjectLiteral} from "../../types/ObjectLiteral";

type PartialColumn = Omit<IColumn, "name" | "type" | "default">

const DefaultColumnOptions: ColumnOptions & ObjectLiteral = {
   nullable: false,
   // update: true,
   // select: true,
   generated: false,
   primary: false
}

export const createOptions = (options: ColumnOptions & ObjectLiteral = {}): PartialColumn => {
   return Object.keys(DefaultColumnOptions)
       .reduce((acc, key) => {
          return {
             ...acc,
             [key]: options[key] !== undefined ? options[key] : DefaultColumnOptions[key]
          }
       }, {} as PartialColumn)
}
