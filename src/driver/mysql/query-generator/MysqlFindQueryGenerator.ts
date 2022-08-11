import {ObjectLiteral} from "../../../types/ObjectLiteral";
import {Query} from "../../../sql/Query";
import {MySQLConstants} from "../../../sql/constants/mysql";
import {ITable} from "../../../sql/models/table";
import {QueryGenerator} from "../../../query-runner/QueryGenerator";
import {FindOneOptions} from "../../../find-options/FindOneOptions";
import {FindOperator} from "../../../find-options/FindOperator";
import {OperatorMap} from "./OperatorMap";
import {FindOptionsSelect} from "../../../find-options/FindOptionsSelect";
import {FindOptionsWhere} from "../../../find-options/FindOptionsWhere";

export class MysqlFindQueryGenerator implements QueryGenerator {

   private constants = MySQLConstants

   generate<Entity extends ObjectLiteral = any>(table: ITable, options?: FindOneOptions<Entity>): Query {
      const escape = this.constants.kwEscape;
      const {where, select} = Object.assign({}, options)
      const selectClause = this.formatSelectClause(select);
      const whereClause = this.formatWhereClause(where);
      return new Query(
          //@formatter:off
          `SELECT ${selectClause} FROM ${escape}${table.name}${escape} ${whereClause}`,
          //@formatter:on
          this.getWhereValues(where)
      )
   }

   formatSelectClause<Entity extends ObjectLiteral = any>(selectClause?: FindOptionsSelect<Entity>): string {
      if (!selectClause) return "*"
      return Object.keys(selectClause)
          .filter(field => selectClause[field])
          .join(", ")
   }

   formatWhereClause<Entity extends ObjectLiteral = any>(whereClause?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): string {
      if (!whereClause) return ""
      return `WHERE ${this.formatWhere(whereClause)}`
   }

   formatWhere<Entity extends ObjectLiteral = any>(whereClause: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): string {
      if (Array.isArray(whereClause)) return this.formatOr(whereClause)
      return this.formatAnd(whereClause)
   }

   formatAnd<Entity extends ObjectLiteral = any>(entity: FindOptionsWhere<Entity>): string {
      const escape = this.constants.kwEscape;
      const result = Object.entries(entity)
          .map(([key, value]) =>
              value instanceof FindOperator ?
                  `${escape}${key}${escape} ${this.getOperatorValue(value).statement}` :
                  `${escape}${key}${escape} = ?`
          )
          .join(' AND ')
      return `(${result})`
   }

   formatOr<Entity extends ObjectLiteral = any>(whereClause: FindOptionsWhere<Entity>[]): string {
      return whereClause.map(value => this.formatAnd(value)).join(' OR ');
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
      if (!values.find(v => v instanceof FindOperator)) return values
      return values.flatMap(value => value instanceof FindOperator ?
          this.getFindOperatorOrPlainValues(value.getValues())
          : [value])
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

   private fillPlaceholders(length: number): string {
      return new Array(length).fill("?").join(",")
   }
}
