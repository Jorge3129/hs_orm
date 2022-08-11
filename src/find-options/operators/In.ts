import {FindOperator} from "../FindOperator";

export const In = <T = any>(value: T[]) => {
   return new FindOperator("in", value)
}
