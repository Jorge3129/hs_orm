export type FindOptionsRelationsProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
    : Property extends Array<infer I>
        ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
        : Property extends Function
            ? never
            : Property extends Buffer
                ? never
                : Property extends Date
                    ? never
                    : Property extends object
                        ? FindOptionsRelations<Property> | boolean
                        : boolean

export type FindOptionsRelations<Entity> = {
   [P in keyof Entity]?: P extends "toString"
       ? unknown
       : FindOptionsRelationsProperty<NonNullable<Entity[P]>>
}

export type FindOptionsRelationByString = string[]
