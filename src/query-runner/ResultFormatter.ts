

export interface ResultFormatter {
   getInsertedRow<Entity>(queryResult: any): Entity
   getFindResult<Entity>(queryResult: any): Entity[]
}
