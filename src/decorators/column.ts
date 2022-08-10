import "reflect-metadata"
import {getMetadata, getTempMetadata} from "../metadata/MetaData";

export interface Options {
   type?: string
   name?: string
   length?: number
   primaryKey?: boolean
   autoIncrement?: boolean
   notNull?: boolean
   default?: any
}


const convertOptions = (options: Options): Options => {
   return {
      notNull: !!options?.notNull,
      autoIncrement: !!options?.autoIncrement,
      primaryKey: !!options?.primaryKey,
      default: options?.default,
   }
}

export function Column(options?: Options) {
   return function (target: any, key: string) {
      const t = Reflect.getMetadata("design:type", target, key);
      // console.log("  " + t.name)
      const column = Object.assign({
         name: key,
         type: t.name
         //@ts-ignore
      }, convertOptions(options))
      //@ts-ignore
      getTempMetadata().columns.push(column)
   }
}
