import {ObjectLiteral} from "../../types/ObjectLiteral";

export const createOptions = <T extends ObjectLiteral, U = T>(defaultOptions: T, options?: T & ObjectLiteral): U => {
   const newOptions: ObjectLiteral = options || {}
   return Object.keys(defaultOptions)
       .reduce((acc, key) => {
          return {
             ...acc,
             [key]: newOptions[key] !== undefined ? newOptions[key] : defaultOptions[key]
          }
       }, {} as U)
}
