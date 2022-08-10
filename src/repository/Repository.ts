import {ObjectLiteral} from "../types/ObjectLiteral";
import {EntityManager} from "../entity-manager/EntityManager";
import {FindOneOptions} from "../find-options/FindOptions";


export class Repository<Entity extends ObjectLiteral = any> {

   constructor(
       public entity: Function,
       public manager: EntityManager
   ) {
   }

   async save<T extends Partial<Entity>>(item: T): Promise<T & Partial<Entity>> {
      return this.manager.save<T>(item, this.entity)
   }

   async find<T extends FindOneOptions<Entity>>(options?: T): Promise<Array<T & Entity>> {
      return this.manager.find<T>(this.entity, options)
   }
}
