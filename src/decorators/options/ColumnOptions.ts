import {ColumnCommonOptions} from "./ColumnCommonOptions";
import {ColumnType} from "../../driver/types/ColumnTypes";

export interface ColumnOptions extends ColumnCommonOptions {
   type?: ColumnType
   name?: string
   length?: string | number
   width?: number
   nullable?: boolean
   update?: boolean
   select?: boolean
   insert?: boolean
   default?: any
   onUpdate?: string
   primary?: boolean
   unique?: boolean
   unsigned?: boolean
   charset?: string
   collation?: string
   enum?: (string | number)[] | Object
   enumName?: string
   primaryKeyConstraintName?: string
   foreignKeyConstraintName?: string
}
