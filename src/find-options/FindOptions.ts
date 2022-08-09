export interface FindOneOptions<Entity = any> {
   where?: Partial<Entity> | Partial<Entity>[]
   relations?: any
}
