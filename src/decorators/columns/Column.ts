import "reflect-metadata"
import {getTempMetadata} from "../../metadata/MetaData";
import {ColumnOptions} from "../options/ColumnOptions";
import {createOptions} from "../options/DefaultColumnOptions";


export function Column(options?: ColumnOptions) {
   return function (target: any, key: string) {
      const t = Reflect.getMetadata("design:type", target, key);
      const column = Object.assign({
         name: key,
         type: options?.type || t.name,
         default: options?.default
      }, createOptions(options))
      getTempMetadata().columns.push(column)
   }
}
