import "reflect-metadata"
import {getTempMetadata} from "../../metadata/MetaData";
import {ColumnOptions} from "../options/ColumnOptions";
import {createOptions} from "../options/createOptions";
import {DefaultColumnOptions} from "../options/DefaultColumnOptions";
import {IColumn} from "../../sql/models/column";

type PartialColumn = Omit<IColumn, "name" | "type" | "default">

export function Column(options?: ColumnOptions) {
   return function (target: any, key: string) {
      const t = Reflect.getMetadata("design:type", target, key);
      const column = Object.assign({
         name: key,
         type: options?.type || t.name,
         default: options?.default
      }, createOptions<ColumnOptions, PartialColumn>(DefaultColumnOptions, options));
      getTempMetadata().columns.push(column)
   }
}
