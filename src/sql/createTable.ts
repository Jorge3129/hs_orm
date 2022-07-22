import {ISchema, ITable} from "../models/table";
import {IColumn} from "../models/column";

export const createTable = (table: ITable): string => {
   //@formatter:off
   return `CREATE TABLE IF NOT EXISTS \`${table.name}\`(\n${extractColumns(table.schema)}\n);`
   //@formatter:on
}

const extractColumns = (schema: ISchema): string => {
   const entries: [string, IColumn][] = Object.entries(schema);
   const columns = entries.map(([key, value], i) => {
      return `\`${key}\` ${extractOptions(value)}`
   })
   return columns.join(',\n')
}

const extractOptions = (column: IColumn): string => {
   const newOptions = {
      type: getType(column.type),
      notNull: column.notNull ? "NOT NULL" : "",
      primaryKey: column.primaryKey ? "PRIMARY KEY" : "",
      autoIncrement: column.autoIncrement ? "AUTO_INCREMENT" : "",
      default: column.default !== undefined ? `DEFAULT ${column.default}` : "",
   }
   return Object.values(newOptions).filter(option => option).join(' ')
}

const getType = (type: string): string => {
   switch (type) {
      case "String":
         return "VARCHAR(100)";
      case "Number":
         return "INT";
      case "Date":
         return "DATE";
      case "Boolean":
         return "BOOLEAN";
      default :
         return "?"
   }
}
