export class Query {
   constructor(
       public statement: string,
       public values?: any
   ) {
   }
}

export const isQuery = (query: string | Query): query is Query => {
   return typeof query === "object" && "statement" in query
}

export const getQueryText = (queryTextOrObject: string | Query, values?: any) => {
   return isQuery(queryTextOrObject) ? [queryTextOrObject.statement, queryTextOrObject.values] : [queryTextOrObject, values]
}
