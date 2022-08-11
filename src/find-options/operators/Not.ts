import {FindOperator} from "../FindOperator"

export const Not = <T>(value: T | FindOperator<T>) => {
   return new FindOperator("not", value)
}
