import {Driver} from "../driver/Driver";
import {DriverFactory} from "../driver/DriverFactory";
import {DataSourceConfig} from "./DataSourceConfig";
import {ObjectLiteral} from "../types/ObjectLiteral";
import {EntityManager} from "../entity-manager/EntityManager";
import {Repository} from "../repository/Repository";

export class DataSource {

   readonly driver: Driver
   manager: EntityManager

   constructor(public readonly config: DataSourceConfig) {
      this.driver = new DriverFactory().create(this)
      this.manager = new EntityManager(this);
   }

   public getRepository<T extends ObjectLiteral = any>(entity: Function): Repository<T> {
      return this.manager.getRepository<T>(entity)
   }

   public async initialize(): Promise<this> {
      await this.driver.connect()
      const queryRunner = this.driver.createQueryRunner();
      await queryRunner.dropTables()
      await queryRunner.createTables()
      return this
   }

   public destroy(): Promise<void> {
      return this.driver.disconnect()
   }
}
