import "reflect-metadata"
import {createSchema} from "../../sql/create-schema";
import {getTempMetadata, saveMetaData} from "../../metadata/MetaData";
import {createRelationSchema} from "../../sql/createRelationSchema";

export const Entity = (name?: string) => {
   return (target: any) => {
      const metadata = getTempMetadata()
      // console.log(target.name)
      metadata.tables.push({
         name: name || target.name,
         schema: createSchema(metadata.columns, metadata.relations),
         relationSchema: createRelationSchema(metadata.relations),
         entity: target,
         primaryKey: metadata.columns.find(c => c.primary),
         foreignKeys: [],
         relations: metadata.relations
      })
      metadata.columns = []
      metadata.relations = []
      saveMetaData()
   }
}
