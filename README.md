
##@heorhii.sanchenko/typeorm

This is a simple clone of TypeORM

Currently, it has no relations between tables and a limited choice of data types.
Also, there are only 'save' and 'find' methods available on thr Repository class.
Besides, it supports ony MySQL and Postgres as of now.

Here is a simple usage example:

```typescript

import {Entity, PrimaryGeneratedColumn, Column, DataSource} from "@heorhii.sanchenko/typeorm";

@Entity('user')
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   name: string

   @Column()
   dob: Date
}

const myDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   database: "typeorm",
   password: "typeorm",
   logging: true
})

const main = async () => {
   try {
      await myDataSource.initialize()
      const userRepo = myDataSource.getRepository<User>(User)

      await userRepo.save({name: "Jorge", dob: new Date('2003-07-14')})
      await userRepo.save({name: "Paul", dob: new Date('2003-07-15')})
      await userRepo.save({name: "John", dob: new Date('2003-07-16')})
      await userRepo.save({name: "John", dob: new Date('2003-07-17')})
      await userRepo.save({name: "John", dob: new Date('2003-07-18')})

      const findResult = await userRepo.find({
         where: [
            {id: 1},
            {name: "John"}
         ]
      })

      console.log(findResult)

      const findResult2 = await userRepo.find({
         where: [
            {name: "John", dob: new Date('2003-07-17')}
         ]
      })

      console.log(findResult2)

      await myDataSource.destroy()
   } catch (e) {
      console.log(e)
      await myDataSource.destroy()
      process.exit(1)
   }
}

main().then(() => {
   process.exit(0)
})
```

