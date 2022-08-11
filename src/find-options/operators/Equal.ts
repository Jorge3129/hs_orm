import {FindOperator} from "../FindOperator";


export const Equal = <T = string>(value: T) => {
   return new FindOperator("equal", value)
}
