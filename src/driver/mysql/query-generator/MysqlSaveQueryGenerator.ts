import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {ITable} from "../../../sql/models/table";
import {MysqlQueryGenerator} from "./MysqlQueryGenerator";

export class MysqlSaveQueryGenerator extends MysqlQueryGenerator {

   private table: ITable

   public generate<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entity: Entity): Query {
      this.table = table;
      const model = this.removeRelatedField(table, entity)

      const tableName = this.escape(table.name);
      const columnNames = this.formatColumnsNames(model);
      const placeholders = this.getPlaceholders(model);

      //@formatter:off
      const queryString = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders});
SELECT * FROM ${tableName} WHERE ${this.escape(table.primaryKey?.name)} = LAST_INSERT_ID();`
      //@formatter:on

      return new Query(queryString, this.getValues(entity))
   }

   formatColumnsNames<Entity extends ObjectLiteral>(entity: Entity): string {
      return Object.keys(entity)
          .map(key => `${this.escape(key)}`)
          .join(',')
   }

   getPlaceholders<Entity extends ObjectLiteral>(entity: Entity): string {
      const length = Object.values(entity).length;
      return this.fillPlaceholders(length)
   }

   getValues<Entity extends ObjectLiteral>(entity: Entity): any[] {
      return Object.entries(entity).map(([key, value]) => {
         const column = this.table.schema[key]
         if (column?.relation?.relationType === "many-to-one")
            return column.relation.inverseSideProperty(value)
         return value
      })
   }
}
