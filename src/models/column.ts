export interface IColumn {
   name: string
   type: any // ColumnType
   notNull: boolean
   autoIncrement: boolean
   primaryKey: boolean
   default: any | null
}
