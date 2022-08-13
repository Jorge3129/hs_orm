import {FindOptionsSelect} from "./FindOptionsSelect";
import {FindOptionsWhere} from "./FindOptionsWhere";
import {FindOptionsRelationByString, FindOptionsRelations} from "./FindOptionsRelations";
import {FindOptionsOrder} from "./FindOptionsOrder";

export interface FindOneOptions<Entity = any> {
   select?: FindOptionsSelect<Entity>
   where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>
   relations?: FindOptionsRelationByString //| FindOptionsRelations<Entity>
   order?: FindOptionsOrder<Entity>
}
