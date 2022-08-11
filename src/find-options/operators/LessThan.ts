import {FindOperator} from "../FindOperator";

export const LessThan = <T = string>(value: T) => {
   return new FindOperator("lessThan", value)
}
