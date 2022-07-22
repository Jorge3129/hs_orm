import "reflect-metadata"
import {database} from "./store";

export interface Options {
   primaryKey?: boolean
   autoIncrement?: boolean
   notNull?: boolean
   default?: any
}


const convertOptions = (options: Options): Required<Options> => {
   return {
      notNull: !!options?.notNull,
      autoIncrement: !!options?.autoIncrement,
      primaryKey: !!options?.primaryKey,
      default: options?.default
   }
}

export function Column(options?: Options) {
   return function (target: any, key: string) {
      const t = Reflect.getMetadata("design:type", target, key);
      // console.log(t.name)
      const column = Object.assign({
         name: key,
         type: t.name
      }, convertOptions(options))
      database.columns.push(column)
   }
}
