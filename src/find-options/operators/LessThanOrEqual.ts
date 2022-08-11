import {FindOperator} from "../FindOperator";

export const LessThanOrEqual = <T = string>(value: T) => {
   return new FindOperator("lessThanOrEqual", value)
}
