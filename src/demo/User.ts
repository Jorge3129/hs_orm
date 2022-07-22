import {Entity} from "../decorators/entity";
import {Column} from "../decorators/column";

@Entity('user')
export class User {
   @Column({primaryKey: true, autoIncrement: true})
   id: number

   @Column()
   name: string

   // @Column()
   // city: City

   @Column({default: 10})
   age: number

   @Column()
   dob: Date

   @Column()
   married: boolean
}
