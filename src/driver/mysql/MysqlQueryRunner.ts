import {MysqlDriver} from "./MysqlDriver";
import {QueryRunner} from "../../query-runner/QueryRunner";
import {DataSource} from "../../data-source/DataSource";
import {getMetadata} from "../../metadata/MetaData";
import {AsyncArray} from "../../utils/AsyncArray";
import {MysqlSchemaBuilder} from "./MysqlSchemaBuilder";

export class MysqlQueryRunner implements QueryRunner {

   readonly dataSource: DataSource

   constructor(private driver: MysqlDriver) {
      this.dataSource = driver.dataSource
   }

   async createTables(): Promise<MysqlQueryRunner> {
      const tables = getMetadata().tables;
      const statements = AsyncArray.from(tables.map(MysqlSchemaBuilder.createTable))
      await statements.mapAsync(statement => this.driver.query(statement))
      return this
   }

   async dropTables(): Promise<MysqlQueryRunner> {
      const tables = getMetadata().tables;
      const statements = AsyncArray.from(tables.map(MysqlSchemaBuilder.dropTable))
      await statements.mapAsync(statement => this.driver.query(statement))
      return this
   }
}
