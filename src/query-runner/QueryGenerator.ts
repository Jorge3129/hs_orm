import {Query} from "../sql/Query";

export interface QueryGenerator {
   generate<Entity = any>(...args: any[]): string | Query
}
