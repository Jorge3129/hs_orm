import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {ITable} from "../../../sql/models/table";
import {QueryGenerator} from "../../../query-runner/QueryGenerator";
import {EmptyObject} from "../../../types/EmptyObject";
import {PostgresConstants} from "../../../sql/constants/pg";

export class PostgresSaveManyQueryGenerator implements QueryGenerator {

   private constants = PostgresConstants
   private parameterIndex: number = 0

   public generate<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entities: Entity[]): Query {
      const escape = this.constants.kwEscape;

      const model = this.createModel(entities)

      const columnNames = this.formatColumnsNames(model);
      const placeholders = this.getPlaceholders(model, entities)

      //@formatter:off
      const queryString = `INSERT INTO ${escape}${table.name}${escape} (${columnNames}) VALUES ${placeholders};`
      //@formatter:on

      return new Query(queryString, this.getValues(model, entities))
   }

   private formatColumnsNames(model: ObjectLiteral): string {
      const escape = this.constants.kwEscape;
      return Object.keys(model)
          .map(key => `${escape}${key}${escape}`)
          .join(',')
   }

   private createModel(entities: ObjectLiteral[]): EmptyObject {
      if (entities.length === 0) throw new Error("You must insert at least one record")
      const fullModel = entities.reduce((model, entity) => Object.assign(model, entity), {})
      return Object.keys(fullModel).reduce((model, key) => ({...model, [key]: undefined}), {})
   }

   private getPlaceholders(model: ObjectLiteral, entities: ObjectLiteral[]): string {
      const getSinglePlaceholder = (model: ObjectLiteral) => Object.keys(model).map(_ => `$${++this.parameterIndex}`).join(', ');
      return entities.map(_ => `(${getSinglePlaceholder(model)})`).join(', ')
   }

   private getValues<Entity extends ObjectLiteral>(model: ObjectLiteral, entities: Entity[]): any[] {
      return entities.flatMap(entity => Object.values(Object.assign(model, entity)))
   }
}
