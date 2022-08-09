export interface QueryRunner {
   createTables(): Promise<QueryRunner>;
   dropTables(): Promise<QueryRunner>;
}
