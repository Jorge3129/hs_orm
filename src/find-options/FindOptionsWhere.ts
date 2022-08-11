import {FindOperator} from "./FindOperator"
import {EqualOperator} from "./EqualOperator"

export type FindOptionsWhereProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsWhereProperty<NonNullable<I>>
    : Property extends Array<infer I>
        ? FindOptionsWhereProperty<NonNullable<I>>
        : Property extends Function
            ? never
            : Property extends Buffer
                ? Property | FindOperator<Property>
                : Property extends Date
                    ? Property | FindOperator<Property>
                    : Property extends object
                        ?
                        | FindOptionsWhere<Property>
                        | FindOptionsWhere<Property>[]
                        | EqualOperator<Property>
                        | FindOperator<any>
                        | boolean
                        : Property | FindOperator<Property>

export type FindOptionsWhere<Entity> = {
   [P in keyof Entity]?: P extends "toString"
       ? unknown
       : FindOptionsWhereProperty<NonNullable<Entity[P]>>
}

