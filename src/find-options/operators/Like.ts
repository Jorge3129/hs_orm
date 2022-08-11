import {FindOperator} from "../FindOperator";

export const Like = (value: string) => {
   return new FindOperator("like", value)
}
