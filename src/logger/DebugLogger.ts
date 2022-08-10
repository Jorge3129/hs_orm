import {Logger} from "./Logger";
import {DataSourceConfig} from "../data-source/DataSourceConfig";
import dayjs from "dayjs";


export class DebugLogger implements Logger {

   constructor(private readonly config: DataSourceConfig) {
   }

   public logQuery(queryText: string, values?: any): void {
      if (!this.config.logging) return;
      console.log("")
      console.log("\x1b[32m", DebugLogger.formatDateTime(new Date()))
      console.log(queryText);
      if (values) console.log(values)
   }

   private static formatDateTime(date: Date) {
      const dateString = dayjs(date).format('YYYY-MM-DDT HH:mm:ss')
      return `[${dateString}]`
   }
}
