import {ITable} from "../sql/models/table";
import 'reflect-metadata'
import {IColumn} from "../sql/models/column";
import {IRelation} from "../sql/models/relation";

interface IMetaData {
   tables: ITable[]
   columns: IColumn[]
   relations: IRelation[]
}

const metadata: IMetaData = {
   tables: [],
   columns: [],
   relations: []
}

export const saveMetaData = () => {
   Reflect.defineMetadata('tables', metadata.tables, metadata)
}

export const getTempMetadata = () => {
   return metadata
}

interface IMetaDataApi {
   tables: ITable[]
   relations: any[]
}

export const getMetadata = () => {
   return {
      tables: Reflect.getMetadata('tables', metadata)
   } as { tables: ITable[] }
}
