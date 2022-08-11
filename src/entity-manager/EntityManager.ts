import {Repository} from "../repository/Repository";
import {ObjectLiteral} from "../types/ObjectLiteral";
import {getMetadata} from "../metadata/MetaData";
import {DataSource} from "../data-source/DataSource";
import {ITable} from "../sql/models/table";
import {FindOneOptions} from "../find-options/FindOneOptions";

export class EntityManager {

   readonly repos: Repository[] = []
   readonly tables: ITable[] = []

   constructor(public dataSource: DataSource) {
      const metadata = getMetadata();
      const tables = metadata.tables;
      this.tables = tables
      this.repos = tables.map(t => new Repository(t.entity, this))
   }

   public getRepository<T extends ObjectLiteral = any>(entity: Function): Repository<T> {
      return this.repos.find(r => r.entity === entity) as Repository<T>;
   }

   public getTable(entity: Function): ITable {
      const table = this.tables.find(t => t.entity === entity);
      if (!table) throw new Error("No table found for entity")
      return table
   }

   save<T extends ObjectLiteral = any>(item: T, entity: Function): Promise<T>;
   save<T extends ObjectLiteral = any>(item: T[], entity: Function): Promise<T[]>;

   async save<T extends ObjectLiteral = any>(item: T | T[], entity: Function): Promise<T | T[]> {
      const table = this.getTable(entity)
      const driver = this.dataSource.driver
      const query = Array.isArray(item) ?
          driver.getQueryGenerator("saveMany").generate(table, item) :
          driver.getQueryGenerator("save").generate(table, item)
      const result = await driver.query(query)
      return driver.getResultFormatter().getInsertedRow(result)
   }

   async find<T extends FindOneOptions>(
       entity: Function,
       options?: T,
   ): Promise<any[]> {
      const table = this.getTable(entity)
      const driver = this.dataSource.driver
      const query = driver.getQueryGenerator("find").generate(table, options)
      const result = await driver.query(query)
      return driver.getResultFormatter().getFindResult(result)
   }
}
