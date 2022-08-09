export interface IColumn {
   name: string
   type: any
   notNull: boolean
   autoIncrement: boolean
   primaryKey: boolean
   default: any | null
   generated: boolean
}
