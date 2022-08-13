import {ISchema, ITable} from "../../sql/models/table";
import {IColumn} from "../../sql/models/column";
import {MySQLConstants} from "../../sql/constants/mysql";
import {Query} from "../../sql/Query";

export class MysqlSchemaBuilder {

   private constants = MySQLConstants
   private readonly values: any[] = []

   static createTable(table: ITable): Query {
      return new MysqlSchemaBuilder().createTable(table)
   }

   static dropTable(table: ITable): string {
      return new MysqlSchemaBuilder().dropTable(table)
   }

   createTable(table: ITable): Query {
      const escape = this.constants.kwEscape;
      const columns = this.extractColumns(table.schema);
      //@formatter:off
      const queryString = `CREATE TABLE IF NOT EXISTS ${escape}${table.name}${escape}(\n${this.extractColumns(table.schema)}\n);`
      //@formatter:on
      return new Query(queryString, this.values)
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
      const newOptions = [
         this.getType(column.type),
         column.primary && "PRIMARY KEY",
         column.generated && "AUTO_INCREMENT",
         !column.nullable && "NOT NULL",
         column.default !== undefined && `DEFAULT ?`,
      ]
      if (column.default !== undefined) this.values.push(column.default)
      return newOptions.filter(option => option).join(' ')
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
