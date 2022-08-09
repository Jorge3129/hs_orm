import { getMetadata } from "../metadata/MetaData";

export function PrimaryGeneratedColumn() {
   return function (target: any, key: string) {
      const t = Reflect.getMetadata("design:type", target, key);
      if (t.name !== "Number") throw new Error('PrimaryGeneratedColumn must be numeric')
      // console.log("  " + t.name)
      const column = Object.assign({
         name: key,
         type: t.name,
         primaryKey: true,
         generated: true
      })
      getMetadata().columns.push(column)
   }
}
