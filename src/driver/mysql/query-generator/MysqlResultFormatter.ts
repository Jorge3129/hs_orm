import {ResultFormatter} from "../../../query-runner/ResultFormatter";
import {OkPacket} from "mysql";

type SaveResult<T> = [OkPacket, [T]]

export class MysqlResultFormatter implements ResultFormatter {

   getInsertedRow<Entity>(queryResult: SaveResult<Entity>): Entity {
      const result = queryResult[1][0];
      return {...result}
   }

   getFindResult<Entity>(queryResult: Entity[]): Entity[] {
      return queryResult.map(row => ({...row}))
   }
}
