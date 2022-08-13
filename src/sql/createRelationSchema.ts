import {IRelation} from "./models/relation";
import {IRelationSchema} from "./models/table";

export const createRelationSchema = (relations: IRelation[]): IRelationSchema => {
   return relations.reduce((acc, relation) => {
      return {...acc, [relation.propertyName]: relation}
   }, {} as IRelationSchema)
}
