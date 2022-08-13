import {ObjectType} from "../../common/ObjectType";
import {getTempMetadata} from "../../metadata/MetaData";
import {RelationOptions} from "../options/RelationOptions";
import {createOptions} from "../options/createOptions";
import {defaultRelationOptions} from "../options/defaultRelationOptions";

export function ManyToOne<T>
(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide: string | ((object: T) => any),
    options?: RelationOptions
) {
   return function (target: any, key: string) {
      console.log(key)
      getTempMetadata().relations.push({
         relationType: "many-to-one",
         target: target.constructor,
         propertyName: key,
         options: createOptions<RelationOptions, RelationOptions>(defaultRelationOptions, options),
         type: typeof typeFunctionOrTarget === "string" ? (obj: any) => obj[typeFunctionOrTarget] : typeFunctionOrTarget,
         inverseSideProperty: typeof inverseSide === "string" ? (obj: any) => obj[inverseSide] : inverseSide
      })
   }
}
