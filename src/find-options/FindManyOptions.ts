import {FindOneOptions} from "./FindOneOptions"

export interface FindManyOptions<Entity = any> extends FindOneOptions<Entity> {
   skip?: number
   take?: number
}
