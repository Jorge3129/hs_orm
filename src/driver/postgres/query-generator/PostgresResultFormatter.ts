import {ResultFormatter} from "../../../query-runner/ResultFormatter";

export class PostgresResultFormatter implements ResultFormatter {

   getInsertedRow<Entity>(queryResult: any): Entity {
      return queryResult.rows[0]
   }

   getFindResult<Entity>(queryResult: any): Entity[] {
      return queryResult.rows;
   }
}
