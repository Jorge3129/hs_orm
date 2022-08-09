import {Driver} from "../Driver";
import * as mysql from "mysql";
import {Connection} from "mysql";
import {DataSource} from "../../data-source/DataSource";
import {QueryRunner} from "../../query-runner/QueryRunner";
import {MysqlQueryRunner} from "./MysqlQueryRunner";
import {getQueryText, Query} from "../../sql/Query";
import {QueryGenerator} from "../../query-runner/QueryGenerator";
import {MysqlSaveQueryGenerator} from "./query-generator/MysqlSaveQueryGenerator";
import {MysqlResultFormatter} from "./query-generator/MysqlResultFormatter";
import {MysqlFindQueryGenerator} from "./query-generator/MysqlFindQueryGenerator";

export class MysqlDriver implements Driver {

   private connection: Connection

   constructor(public readonly dataSource: DataSource) {
   }

   public connect(): Promise<void> {
      const config = this.dataSource.config;
      this.connection = mysql.createConnection({
         host: config.host,
         user: config.user || "root",
         password: config.password || "",
         database: config.database,
         multipleStatements: true
      })
      this.connection.connect()
      return Promise.resolve();
   }

   public disconnect(): Promise<void> {
      return Promise.resolve(undefined);
   }

   public createQueryRunner(): QueryRunner {
      return new MysqlQueryRunner(this);
   }

   public query(queryTextOrObject: string | Query, values?: any): Promise<any> {
      const [queryText, queryValues] = getQueryText(queryTextOrObject)
      return new Promise<any>((resolve, reject) => {
         this.connection.query(queryText, queryValues, ((err, results) => {
            if (err) reject(err)
            resolve(results)
         }));
      })
   }

   getQueryGenerator(type: string): QueryGenerator {
      switch (type) {
         case "save":
            return new MysqlSaveQueryGenerator();
         case "find":
            return new MysqlFindQueryGenerator();
         default:
            throw new Error("This query type is not supported")
      }
   }

   getResultFormatter(): MysqlResultFormatter {
      return new MysqlResultFormatter();
   }
}
