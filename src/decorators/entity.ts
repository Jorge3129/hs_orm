import {database} from "./store";
import {createSchema} from "../utils/create-schema";

export const Entity = (name?: string) => {
   return (target: any) => {
      database.tables.push({
         name: name || target.name,
         rows: [],
         schema: createSchema(database.columns)
      })
      database.columns = []
   }
}
