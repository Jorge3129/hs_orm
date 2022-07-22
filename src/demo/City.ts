import {Column} from "../decorators/column";
import {Entity} from "../decorators/entity";

@Entity()
export class City {
   @Column({primaryKey: true, autoIncrement: true})
   id: number

   @Column()
   name: string

   @Column()
   population: number
}
