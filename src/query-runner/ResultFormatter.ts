

export interface ResultFormatter {
   getInsertedRow<Entity = any>(queryResult: any): Entity
   getFindResult<Entity = any>(queryResult: any): Entity[]
}
