import {QueryRunner} from "../../query-runner/QueryRunner";
import {DataSource} from "../../data-source/DataSource";
import {getMetadata} from "../../metadata/MetaData";
import {AsyncArray} from "../../utils/AsyncArray";
import {PostgresDriver} from "./PostgresDriver";
import {PostgresSchemaBuilder} from "./PostgresSchemaBuilder";

export class PostgresQueryRunner implements QueryRunner {

   readonly dataSource: DataSource

   constructor(private driver: PostgresDriver) {
      this.dataSource = driver.dataSource
   }

   async createTables(): Promise<PostgresQueryRunner> {
      const tables = getMetadata().tables;
      const statements = AsyncArray.from(tables.map(PostgresSchemaBuilder.createTable))
      const results = await statements.mapAsync(statement => this.driver.query(statement))
      return this
   }

   async dropTables(): Promise<PostgresQueryRunner> {
      const tables = getMetadata().tables;
      const statements = AsyncArray.from(tables.map(PostgresSchemaBuilder.dropTable))
      const results = await statements.mapAsync(statement => this.driver.query(statement))
      return this
   }


}
