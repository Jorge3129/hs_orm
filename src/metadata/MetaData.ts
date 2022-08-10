import {ITable} from "../sql/models/table";
import {IColumn} from "../sql/models/column";
import 'reflect-metadata'

interface IMetaData {
   tables: ITable[]
   columns: IColumn[]
}

const metadata: IMetaData = {
   tables: [],
   columns: []
}

export const saveMetaData = () => {
   Reflect.defineMetadata('tables', metadata.tables, metadata)
}

export const getTempMetadata = () => {
   return metadata
}

export const getMetadata = () => {
   return {tables: Reflect.getMetadata('tables', metadata)} as {
      tables: ITable[]
   }
}
