import "reflect-metadata"
import {Column} from "./Column";

export function PrimaryGeneratedColumn() {
   return function (target: any, key: string) {
      Column({primary: true, generated: true})(target, key)
   }
}
