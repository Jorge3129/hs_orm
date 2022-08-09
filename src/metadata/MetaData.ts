import {ITable} from "../sql/models/table";
import {IColumn} from "../sql/models/column";

interface IMetaData {
   tables: ITable[]
   columns: IColumn[]
}

const metadata: IMetaData = {
   tables: [],
   columns: []
}

export const getMetadata = () => {
   return metadata
}
