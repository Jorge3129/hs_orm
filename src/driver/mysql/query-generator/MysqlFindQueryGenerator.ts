import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {MySQLConstants} from "../../../sql/constants/mysql";
import {ITable} from "../../../sql/models/table";
import {QueryGenerator} from "../../../query-runner/QueryGenerator";
import {FindOneOptions} from "../../../find-options/FindOptions";

export class MysqlFindQueryGenerator implements QueryGenerator {

   private constants = MySQLConstants

   generate<Entity extends ObjectLiteral = any>(table: ITable, options?: FindOneOptions<Entity>): Query {
      const escape = this.constants.kwEscape;
      const whereClause = options?.where;
      return new Query(
          //@formatter:off
          `SELECT * FROM ${escape}${table.name}${escape} ${this.formatWhereClause(whereClause)}`,
          //@formatter:on
          this.getValues(whereClause)
      )
   }

   formatWhereClause<Entity extends ObjectLiteral = any>(whereClause?: Partial<Entity> | Partial<Entity>[]): string {
      if (!whereClause) return ""
      return `WHERE ${this.formatWhere(whereClause)}`
   }

   formatWhere<Entity extends ObjectLiteral = any>(whereClause: Partial<Entity> | Partial<Entity>[]): string {
      if (Array.isArray(whereClause)) return this.formatOr(whereClause)
      return this.formatAnd(whereClause)
   }

   formatAnd<Entity extends ObjectLiteral = any>(entity: Partial<Entity>): string {
      const escape = this.constants.kwEscape;
      const result = Object.keys(entity)
          .map(key => `${escape}${key}${escape} = ?`)
          .join(' AND ')
      return `(${result})`
   }

   formatOr<Entity extends ObjectLiteral = any>(whereClause: Partial<Entity>[]): string {
      return whereClause.map(value => this.formatAnd(value)).join(' OR ');
   }

   getValues<Entity extends ObjectLiteral>(whereClause?: Entity): any[] {
      if (!whereClause) return []
      if (Array.isArray(whereClause))
         return whereClause.flatMap(value => Object.values(value))
      return Object.values(whereClause)
   }
}
