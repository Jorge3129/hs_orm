import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {ITable} from "../../../sql/models/table";
import {EmptyObject} from "../../../types/EmptyObject";
import {MysqlQueryGenerator} from "./MysqlQueryGenerator";

export class MysqlSaveManyQueryGenerator extends MysqlQueryGenerator {

   private table: ITable

   public generate<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entities: Entity[]): Query {
      this.table = table;
      const model = this.createModel(table, entities)

      const tableName = this.escape(table.name);
      const columnNames = this.formatColumnsNames(model);
      const placeholders = this.getPlaceholders(model, entities)

      //@formatter:off
      const queryString = `INSERT INTO ${tableName} (${columnNames}) VALUES ${placeholders};
SELECT * FROM ${tableName} WHERE ${this.escape(table.primaryKey?.name)} = LAST_INSERT_ID();`
      //@formatter:on

      return new Query(queryString, this.getValues(model, entities))
   }

   private formatColumnsNames(model: ObjectLiteral): string {
      return Object.keys(model)
          .map(key => `${this.escape(key)}`)
          .join(',')
   }

   private createModel(table: ITable, entities: ObjectLiteral[]): EmptyObject {
      if (entities.length === 0) throw new Error("You must insert at least one record")
      const fullModel = entities.reduce((model, entity) => Object.assign(model, entity), {})
      const model = Object.keys(fullModel).reduce((model, key) => ({...model, [key]: undefined}), {})
      return this.removeRelatedField(table, model)
   }

   private getPlaceholders(model: ObjectLiteral, entities: ObjectLiteral[]): string {
      const singlePlaceholder = `(${this.getSinglePlaceholder(model)})`;
      return entities.map(_ => singlePlaceholder).join(', ')
   }

   private getSinglePlaceholder(entity: ObjectLiteral): string {
      const length = Object.values(entity).length;
      return new Array(length).fill("?").join(",")
   }

   private getValues<Entity extends ObjectLiteral>(model: ObjectLiteral, entities: Entity[]): any[] {
      return entities.flatMap(entity => Object.values(Object.assign(model, this.getSingleValues(entity))))
   }

   private getSingleValues<Entity extends ObjectLiteral>(entity: Entity): ObjectLiteral {
      return Object.entries(entity).map(([key, value]) => {
         const column = this.table.schema[key]
         if (column?.relation?.relationType === "many-to-one")
            return [key, column.relation.inverseSideProperty(value)]
         return [key, value]
      }).reduce((acc, [key, val]) => ({...acc, [key]: val}), {})
   }
}
