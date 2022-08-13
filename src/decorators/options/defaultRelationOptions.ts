import {RelationOptions} from "./RelationOptions";


export const defaultRelationOptions: RelationOptions = {
   nullable: true,
   cascade: ["delete"],
   createForeignKeyConstraints: true,
}
