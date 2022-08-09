import {Entity} from "../decorators/entity";
import {Column} from "../decorators/column";
import {PrimaryGeneratedColumn} from "../decorators/primary-generated-column";

@Entity('user')
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   name: string

   // @Column()
   // city: City

   @Column()
   dob: Date

   // @Column()
   // married: boolean
}
