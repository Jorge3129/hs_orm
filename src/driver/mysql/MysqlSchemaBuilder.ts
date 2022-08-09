import {ISchema, ITable} from "../../sql/models/table";
import {IColumn} from "../../sql/models/column";
import {MySQLConstants} from "../../sql/constants/mysql";

export class MysqlSchemaBuilder {

   private constants = MySQLConstants

   static createTable(table: ITable): string {
      return new MysqlSchemaBuilder().createTable(table)
   }

   static dropTable(table: ITable): string {
      return new MysqlSchemaBuilder().dropTable(table)
   }

   createTable(table: ITable): string {
      const escape = this.constants.kwEscape;
      //@formatter:off
      return `CREATE TABLE IF NOT EXISTS ${escape}${table.name}${escape}(\n${this.extractColumns(table.schema)}\n);`
      //@formatter:on
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
      const newOptions = {
         type: this.getType(column.type),
         notNull: column.notNull ? "NOT NULL" : "",
         primaryKey: column.primaryKey ? "PRIMARY KEY" : "",
         autoIncrement: column.generated || column.autoIncrement ? "AUTO_INCREMENT" : "",
         default: column.default !== undefined ? `DEFAULT ${column.default}` : "",
      }
      return Object.values(newOptions).filter(option => option).join(' ')
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
