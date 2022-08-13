import {QueryGenerator} from "../../../query-runner/QueryGenerator";
import {Query} from "../../../sql/Query";
import {MySQLConstants} from "../../../sql/constants/mysql";
import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {ITable} from "../../../sql/models/table";

export abstract class MysqlQueryGenerator implements QueryGenerator {
   protected constants = MySQLConstants

   abstract generate<Entity = any>(...args: any[]): string | Query

   protected escape(value: any): string {
      const escape = this.constants.kwEscape;
      return `${escape}${value}${escape}`
   }

   protected fillPlaceholders(length: number): string {
      return new Array(length).fill("?").join(",")
   }

   protected removeRelatedField<Entity extends ObjectLiteral = ObjectLiteral>(table: ITable, entity: Entity): Partial<Entity> {
      return Object.keys(entity).reduce((acc, key) => {
         const relation = table.relations.find(relation => relation.propertyName === key)
         if (relation?.relationType === "one-to-many") return acc
         return {...acc, [key]: entity[key]}
      }, {})
   }
}
