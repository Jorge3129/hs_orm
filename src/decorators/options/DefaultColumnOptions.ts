import {ColumnOptions} from "./ColumnOptions";
import {ObjectLiteral} from "../../types/ObjectLiteral";

export const DefaultColumnOptions: ColumnOptions & ObjectLiteral = {
   nullable: false,
   // update: true,
   // select: true,
   generated: false,
   primary: false
}
