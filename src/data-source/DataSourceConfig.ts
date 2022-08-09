export interface DataSourceConfig {
   type: "mysql" | "postgres",
   host: string,
   port?: number,
   user?: string,
   password: string | null,
   database?: string,
   entities?: string[],
   logging?: boolean,
}
