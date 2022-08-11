import {FindOperator} from "../FindOperator";

export const MoreThan = <T = string>(value: T) => {
   return new FindOperator("moreThan", value)
}
