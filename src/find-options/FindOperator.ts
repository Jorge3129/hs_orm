import {FindOperatorType} from "./FindOperatorType";

export class FindOperator<T = any> {

   constructor(
       public readonly type: FindOperatorType,
       public readonly value: T | FindOperator<T>,
       public readonly useParameter: boolean = true,
       public readonly multipleParameters: boolean = false,
   ) {
   }

   getValues(): any[] {
      if (!this.useParameter) return []
      return Array.isArray(this.value) ? this.value : [this.value]
   }
}
