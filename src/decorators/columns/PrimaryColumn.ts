import {Column} from "./Column";

export function PrimaryColumn() {
   return function (target: any, key: string) {
      Column({primary: true})(target, key)
   }
}
