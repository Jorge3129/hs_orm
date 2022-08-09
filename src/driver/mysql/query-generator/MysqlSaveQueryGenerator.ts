import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {MySQLConstants} from "../../../sql/constants/mysql";
import {ITable} from "../../../sql/models/table";
import {QueryGenerator} from "../../../query-runner/QueryGenerator";

export class MysqlSaveQueryGenerator implements QueryGenerator {

   private constants = MySQLConstants

   public generate<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entity: Entity): Query {
      const escape = this.constants.kwEscape;
      return new Query(
          //@formatter:off
          `INSERT INTO ${escape}${table.name}${escape} (${this.formatColumnsNames(entity)})
           VALUES (${this.getPlaceholders(entity)});
          SELECT *
          FROM ${escape}${table.name}${escape}
          WHERE ${escape}${table.primaryKey?.name}${escape} = LAST_INSERT_ID();`,
          this.getValues(entity)
          //@formatter:on
      )
   }

   formatColumnsNames<Entity extends ObjectLiteral>(entity: Entity): string {
      const escape = this.constants.kwEscape;
      return Object.keys(entity)
          .map(key => `${escape}${key}${escape}`)
          .join(',')
   }

   getPlaceholders<Entity extends ObjectLiteral>(entity: Entity): string {
      const length = Object.values(entity).length;
      return new Array(length).fill("?").join(",")
   }

   getValues<Entity extends ObjectLiteral>(entity: Entity): any[] {
      return Object.values(entity)
   }
}
