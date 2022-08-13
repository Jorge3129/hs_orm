import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {ITable} from "../../../sql/models/table";
import {FindOneOptions} from "../../../find-options/FindOneOptions";
import {FindOperator} from "../../../find-options/FindOperator";
import {OperatorMap} from "./OperatorMap";
import {FindOptionsSelect} from "../../../find-options/FindOptionsSelect";
import {FindOptionsWhere} from "../../../find-options/FindOptionsWhere";
import {MysqlQueryGenerator} from "./MysqlQueryGenerator";
import {EntityManager} from "../../../entity-manager/EntityManager";
import {ColorCodes} from "../../../logger/ColorCodes";

export class MysqlFindQueryGenerator extends MysqlQueryGenerator {

   constructor(public manager: EntityManager) {
      super();
   }

   generate<Entity extends ObjectLiteral = any>(table: ITable, options?: FindOneOptions<Entity>): Query {
      const {where, select} = Object.assign({}, options)
      const selectClause = this.formatSelectClause(table, select);
      const whereClause = this.formatWhereClause(table, where);
      const joinClause = this.formatJoin(table, options);
      return new Query(
          //@formatter:off
          `SELECT ${selectClause} FROM ${this.escape(table.name)} ${joinClause} ${whereClause}`,
          //@formatter:on
          this.getWhereValues(where)
      )
   }

   formatJoin(table: ITable, options?: FindOneOptions<any>): string {
      const relationStrings = options?.relations || []
      const relations = relationStrings.map(relationString => table.relationSchema[relationString])

      const joinTables = relations.map(relation => ({table: this.manager.getTable(relation.type()), relation}))

      return joinTables.map(({table: t, relation}) => {
         const [joinTName, joinTKey, tName, tKey] = [t.name, t.primaryKey?.name, table.name, relation.propertyName].map(a => this.escape(a))
         return `INNER JOIN ${joinTName} ON ${joinTName}.${joinTKey} = ${tName}.${tKey}`
      }).join(' ')
   }

   formatSelectClause<Entity extends ObjectLiteral = any>(table: ITable, selectClause?: FindOptionsSelect<Entity>): string {
      if (!selectClause) return "*"
      return Object.keys(selectClause)
          .filter(field => selectClause[field])
          .map(field => this.getTableName(table) + this.escape(field))
          .join(", ")
   }

   private getTableName(table: ITable): string {
      return this.escape(table.name) + ".";
   }

   formatWhereClause<Entity extends ObjectLiteral = any>(table: ITable, whereClause?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): string {
      if (!whereClause) return ""
      return `WHERE ${this.formatWhere(table, whereClause)}`
   }

   formatWhere<Entity extends ObjectLiteral = any>(table: ITable, whereClause: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): string {
      if (Array.isArray(whereClause)) return this.formatOr(table, whereClause)
      return this.formatAnd(table, whereClause)
   }

   formatAnd<Entity extends ObjectLiteral = any>(table: ITable, entity: FindOptionsWhere<Entity>, brackets?: boolean): string {
      const tableName = this.escape(table.name);
      const result = Object.entries(entity)
          .map(([key, value]) =>
              value.constructor?.name === "FindOperator" ?
                  `${tableName}.${this.escape(key)} ${this.getOperatorValue(value).statement}` :
                  typeof value === "object" ?
                      this.formatRelatedObject(table, key, value) :
                      `${tableName}.${this.escape(key)} = ?`
          )
          .join(' AND ')
      return brackets ? `(${result})` : result
   }

   private formatRelatedObject(table: ITable, key: string, value: any): string {
      // console.log(`${ColorCodes.FgCyan}%s${ColorCodes.Reset}`, '\nformatRelatedObject')
      return new MysqlFindQueryGenerator(this.manager)
          .formatAnd(this.getRelation(table, key), value)
   }

   private getRelation(table: ITable, key: string): ITable {
      const relation = table.relationSchema[key];
      return this.manager.getTable(relation.type())
   }

   formatOr<Entity extends ObjectLiteral = any>(table: ITable, whereClause: FindOptionsWhere<Entity>[]): string {
      return whereClause.map(value => this.formatAnd(table, value, true)).join(' OR ');
   }

   getWhereValues<Entity extends ObjectLiteral>(whereClause?: any): any[] {
      if (!whereClause) return []
      if (Array.isArray(whereClause)) {
         return whereClause.flatMap(value => Object.values(value)
             .flatMap(value => this.getFindOperatorOrPlainValues([value]))
         )
      }
      return Object.values(whereClause).flatMap(value => this.getFindOperatorOrPlainValues([value]))
   }

   getFindOperatorOrPlainValues<T = any>(values: Array<FindOperator<T> | T>): any[] {
      if (!values.find(v => typeof v === "object")) return values
      return values.flatMap((value: any) => {
         return value.constructor?.name === "FindOperator" ?
             this.getFindOperatorOrPlainValues(value.getValues()) :
             typeof value === "object" ?
                 this.getFindOperatorOrPlainValues(Object.values(value))
                 : [value]
      })
   }


   getOperatorValue<T>(operator: FindOperator<T>): Query {
      const query = operator.value instanceof FindOperator ? this.getOperatorValue(operator.value) : operator.value;
      const [placeholder, value] = query instanceof Query ?
          [query.statement, query.values] :
          //@ts-ignore
          [`${this.fillPlaceholders(operator.getValues().length)}`, operator.getValues()]
      const operatorFn = OperatorMap[operator.type]
      return new Query(operatorFn(placeholder), value)
   }
}
