import {FindOperator} from "../FindOperator";

export const Between = <T>(from: T, to: T) => {
   return new FindOperator("between", [from, to] as any, true, true)
}
