import {DataSource} from "../data-source/DataSource";
import {Driver} from "./Driver";
import {MysqlDriver} from "./mysql/MysqlDriver";
import {PostgresDriver} from "./postgres/PostgresDriver";


export class DriverFactory {
   constructor() {
   }

   public create(dataSource: DataSource): Driver {
      switch (dataSource.config.type) {
         case "mysql":
            return new MysqlDriver(dataSource)
         case "postgres":
            return new PostgresDriver(dataSource)
      }
   }
}
