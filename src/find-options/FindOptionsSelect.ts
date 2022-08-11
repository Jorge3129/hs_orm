export type FindOptionsSelectProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsSelectProperty<I> | boolean
    : Property extends Array<infer I>
        ? FindOptionsSelectProperty<I> | boolean
        : Property extends Function
            ? never
            : Property extends Buffer
                ? boolean
                : Property extends Date
                    ? boolean
                    : Property extends object
                        ? FindOptionsSelect<Property>
                        : boolean

export type FindOptionsSelect<Entity> = {
   [P in keyof Entity]?: P extends "toString"
       ? unknown
       : FindOptionsSelectProperty<NonNullable<Entity[P]>>
}
