import {FindOperator} from "../FindOperator";

export const MoreThanOrEqual = <T = string>(value: T) => {
   return new FindOperator("moreThanOrEqual", value)
}
