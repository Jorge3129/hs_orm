import {Column} from "../decorators/column";
import {Entity} from "../decorators/entity";
import {PrimaryGeneratedColumn} from "../decorators/primary-generated-column";

@Entity()
export class City {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   name: string

   @Column()
   population: number
}
