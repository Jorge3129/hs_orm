import {Query} from "../sql/Query";

export interface DriverQueryBuilder {
   save(): Query
}
