import {QueryRunner} from "../query-runner/QueryRunner";
import {Query} from "../sql/Query";
import {QueryGenerator} from "../query-runner/QueryGenerator";
import { ResultFormatter } from "../query-runner/ResultFormatter";

export interface Driver {
   connect(): Promise<any>
   disconnect(): Promise<void>
   query(queryText: string | Query, values?: any): Promise<any>
   query(query: Query): Promise<any>
   createQueryRunner(): QueryRunner
   getQueryGenerator(type: string): QueryGenerator
   getResultFormatter(): ResultFormatter
}
