import {ISchema, ITable} from "../../sql/models/table";
import {IColumn} from "../../sql/models/column";
import {PostgresConstants} from "../../sql/constants/pg";
import {Query} from "../../sql/Query";
import dayjs from "dayjs";

export class PostgresSchemaBuilder {

   private constants = PostgresConstants

   static createTable(table: ITable): Query {
      return new PostgresSchemaBuilder().createTable(table)
   }

   static dropTable(table: ITable): string {
      return new PostgresSchemaBuilder().dropTable(table)
   }

   createTable(table: ITable): Query {
      const escape = this.constants.kwEscape;
      //@formatter:off
      const queryString = `CREATE TABLE IF NOT EXISTS ${escape}${table.name}${escape}(\n${this.extractColumns(table.schema)}\n);`
      //@formatter:on
      return new Query(queryString, [])
   }

   dropTable(table: ITable): string {
      const escape = this.constants.kwEscape;
      return `DROP TABLE IF EXISTS ${escape}${table.name}${escape};`
   }

   extractColumns(schema: ISchema): string {
      const entries: [string, IColumn][] = Object.entries(schema);
      const escape = this.constants.kwEscape;
      const columns = entries.map(([key, value], i) => {
         return `${escape}${key}${escape} ${this.extractOptions(value)}`
      })
      return columns.join(',\n')
   }

   extractOptions(column: IColumn): string {
      // if (column.generated) console.log(column)
      const newOptions = [
         column.generated ? PostgresConstants.generated : this.getType(column.type),
         column.primary && "PRIMARY KEY",
         !column.nullable && "NOT NULL",
         column.default !== undefined && `DEFAULT ${this.format(column.default)}`,
      ]
      return newOptions.filter(option => option).join(' ')
   }

   format(value: any): string {
      if (typeof value === "string") return `'${value}'`
      if (typeof value === "number") return value + ''
      if (typeof value === "object" && value instanceof Date) return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      return 'NULL'
   }

   getType(type: string, length?: number): string {
      switch (type) {
         case "String":
            return `VARCHAR(${length || this.constants.defaultLength})`;
         case "Number":
            return "INT";
         case "Date":
            return "DATE";
         case "Boolean":
            return "BOOLEAN";
         default :
            throw new Error("This type is not supported yet")
      }
   }
}
