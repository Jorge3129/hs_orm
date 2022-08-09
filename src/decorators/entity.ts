import {createSchema} from "../sql/create-schema";
import {getMetadata} from "../metadata/MetaData";

export const Entity = (name?: string) => {
   return (target: any) => {
      const metadata = getMetadata()
      // console.log(target.name)
      metadata.tables.push({
         name: name || target.name,
         schema: createSchema(metadata.columns),
         entity: target,
         primaryKey: metadata.columns.find(c => c.primaryKey)
      })
      metadata.columns = []
   }
}
