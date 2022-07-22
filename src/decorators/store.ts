import {ITable} from "../models/table";
import {IColumn} from "../models/column";

interface IDatabase {
   tables: ITable[]
   columns: IColumn[]
}

export const database: IDatabase = {
   tables: [],
   columns: []
}
