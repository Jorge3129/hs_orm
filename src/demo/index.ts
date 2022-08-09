import {User} from "./User";
import {DataSource} from "../data-source/DataSource";

export const myDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   password: "sgHui780156@#78rTy!%",
   database: "typeorm"
})

console.log(myDataSource.config.type)

const main = async () => {
   try {
      await myDataSource.initialize()
      const userRepo = myDataSource.getRepository<User>(User)

      await userRepo.save({name: "Jorge", dob: new Date('2003-07-14')})
      await userRepo.save({name: "Paul", dob: new Date('2003-07-14')})
      await userRepo.save({name: "John", dob: new Date('2003-07-14')})
      await userRepo.save({name: "John", dob: new Date('2003-07-14')})
      await userRepo.save({name: "John", dob: new Date('2003-07-14')})

      const findRes = await userRepo.find({
         where: [
            {id: 1},
            {name: "John"}
         ]
      })

      console.log(findRes)

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

