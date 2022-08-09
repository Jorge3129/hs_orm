import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {ITable} from "../../../sql/models/table";
import {PostgresConstants} from "../../../sql/constants/pg";

export class PostgresSaveQueryGenerator {

   private constants = PostgresConstants

   generate<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entity: Entity): Query {
      if (!table) throw new Error(`Table ${entity.constructor.name} does not exist`)
      const escape = this.constants.kwEscape;
      return new Query(
          `INSERT INTO ${escape}${table.name}${escape} (${this.formatColumnsNames(entity)})
           VALUES (${this.getPlaceholders(entity)}) RETURNING *`,
          this.getValues(entity)
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
      return new Array(length)
          .fill(0)
          .map((_, i) => `$${i + 1}`)
          .join(",")
   }

   getValues<Entity extends ObjectLiteral>(entity: Entity): any[] {
      return Object.values(entity)
   }
}
