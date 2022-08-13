import {Repository} from "../repository/Repository";
import {ObjectLiteral} from "../types/ObjectLiteral";
import {getMetadata} from "../metadata/MetaData";
import {DataSource} from "../data-source/DataSource";
import {ITable} from "../sql/models/table";
import {FindOneOptions} from "../find-options/FindOneOptions";
import {IRelation} from "../sql/models/relation";
import {Driver} from "../driver/Driver";

export class EntityManager {

   readonly repos: Repository[] = []
   readonly tables: ITable[] = []
   readonly driver: Driver

   constructor(public dataSource: DataSource) {
      const metadata = getMetadata();
      const tables = metadata.tables;
      this.tables = tables
      this.driver = dataSource.driver
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
      if (Array.isArray(item)) return await this.saveMany(item, entity);
      const table = this.getTable(entity)
      const query = this.driver.getQueryGenerator("save").generate(table, item)
      const result = await this.driver.query(query)
      const formattedResult = this.driver.getResultFormatter().getInsertedRow(result)
      const relatedResults = await this.saveRelatedMany(table, {...item, ...formattedResult}, entity)
      return formattedResult
   }

   private saveRelatedMany(table: ITable, item: ObjectLiteral, entity: Function) {
      const relationsAndValues = this.findRelatedColumns(table, item, entity)
      return Promise.all(relationsAndValues.map(async ({relation, value}) => {
         return await this.saveMany(value, relation.type())
      }))
   }

   async saveMany<T extends ObjectLiteral = any>(item: T[], entity: Function): Promise<T[]> {
      const table = this.getTable(entity)
      const query = this.driver.getQueryGenerator("saveMany").generate(table, item)
      const result = await this.driver.query(query)
      return this.driver.getResultFormatter().getInsertedRow(result)
   }

   private findRelatedColumns(table: ITable, item: ObjectLiteral, entity: Function): { relation: IRelation, value: any }[] {
      return Object.entries(item)
          .flatMap(([key, value]) => {
             const relation = table.relationSchema[key]
             if (!relation) return []
             const relatedTable = this.getTable(relation.type())
             //                                                              //Photo
             const inverseRelation = relatedTable.relations.find(relation => relation.type() === entity)
             if (!inverseRelation) throw new Error("No inverse relation found")
             // Photo.user
             const id = inverseRelation.propertyName;
             const mappedValues = value.map((v: any) => ({...v, [id]: item}))
             if (relation?.relationType !== "one-to-many") return []
             return [{relation, value: mappedValues}]
          })
   }

   async find<T extends FindOneOptions>(
       entity: Function,
       options?: T,
   ): Promise<any[]> {
      const table = this.getTable(entity)
      const query = this.driver.getQueryGenerator("find").generate(table, options)
      const result = await this.driver.query(query)
      return this.driver.getResultFormatter().getFindResult(result)
   }
}
