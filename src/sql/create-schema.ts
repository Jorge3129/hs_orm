import {IColumn} from "./models/column";
import {ISchema} from "./models/table";
import {IRelation} from "./models/relation";

export const createSchema = (columns: IColumn[], relations: IRelation[]): ISchema => {
   const schema = columns.reduce((acc, column) => {
      return {...acc, [column.name]: column}
   }, {} as ISchema)

   const addSchema = relations.reduce((acc, relation) => {
      if (relation.relationType !== "many-to-one") return acc;
      const column: IColumn = {
         name: relation.propertyName,
         type: "Number",
         nullable: relation.options.nullable || true,
         primary: false,
         generated: false,
         default: undefined,
         relation: relation
      }
      return {
         ...acc, [relation.propertyName]: column
      }
   }, {} as ISchema)
   return {...schema, ...addSchema}
}
