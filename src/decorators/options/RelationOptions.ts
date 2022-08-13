export interface RelationOptions {
   cascade?: ("insert" | "update" | "delete")[]
   createForeignKeyConstraints?: boolean
   nullable?: boolean
}
