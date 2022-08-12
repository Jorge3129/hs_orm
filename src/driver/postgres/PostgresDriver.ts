import {Driver} from "../Driver";
import {DataSource} from "../../data-source/DataSource";
import {Client} from "pg";
import {QueryRunner} from "../../query-runner/QueryRunner";
import {PostgresQueryRunner} from "./PostgresQueryRunner";
import {getQueryText, Query} from "../../sql/Query";
import {QueryGenerator} from "../../query-runner/QueryGenerator";
import {PostgresSaveQueryGenerator} from "./query-generator/PostgresSaveQueryGenerator";
import {PostgresResultFormatter} from "./query-generator/PostgresResultFormatter";
import {PostgresFindQueryGenerator} from "./query-generator/PostgresFindQueryGenerator";
import {Logger} from "../../logger/Logger";
import {DebugLogger} from "../../logger/DebugLogger";
import { PostgresSaveManyQueryGenerator } from "./query-generator/PostgreSaveManyQueryGenerator";

export class PostgresDriver implements Driver {

   private connection: Client
   public readonly logger: Logger

   constructor(public readonly dataSource: DataSource) {
      this.logger = new DebugLogger(dataSource.config)
   }

   getQueryGenerator(type: string): QueryGenerator {
      switch (type) {
         case "save":
            return new PostgresSaveQueryGenerator();
         case "saveMany":
            return new PostgresSaveManyQueryGenerator();
         case "find":
            return new PostgresFindQueryGenerator();
         default:
            throw new Error("This query type is not supported")
      }
   }

   public connect(): Promise<void> {
      const config = this.dataSource.config;
      this.connection = new Client({
         host: config.host,
         user: config.user || "postgres",
         password: config.password || "",
         database: config.database,
         port: config.port || 5432
      })
      return this.connection.connect();
   }

   public disconnect(): Promise<void> {
      return this.connection.end()
   }

   public createQueryRunner(): QueryRunner {
      return new PostgresQueryRunner(this);
   }

   public query(queryTextOrObject: string | Query, values?: any): Promise<any> {
      const [queryText, queryValues] = getQueryText(queryTextOrObject)
      this.logger.logQuery(queryText, queryValues)
      return this.connection.query(queryText, queryValues);
   }

   getResultFormatter(): PostgresResultFormatter {
      return new PostgresResultFormatter();
   }
}
