import {FindOperator} from "../FindOperator";


export const IsNull = () => {
   return new FindOperator("isNull", undefined, false)
}
