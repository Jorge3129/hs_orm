import {RelationOptions} from "../../decorators/options/RelationOptions";
import {ObjectType} from "../../common/ObjectType";


export interface IRelation<T = any> {
   target: Function,
   propertyName: string,
   // propertyType: reflectedType,
   relationType: "many-to-one" | "one-to-many" | "many-to-many",
   type: ((type?: any) => ObjectType<T>),
   inverseSideProperty: ((object: T) => any),
   options: RelationOptions,
}
