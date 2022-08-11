import {MysqlFindQueryGenerator} from "../../../../src/driver/mysql/query-generator/MysqlFindQueryGenerator"


describe('MysqlFindQueryGenerator test', () => {

   const generator = new MysqlFindQueryGenerator();

   test('formatWhere with object', () => {
      const actual = generator.formatWhere({name: "Andrew", age: 10})
      expect(actual).toBe("(`name` = ? AND `age` = ?)")
   })

   test('formatWhere with array', () => {
      const actual = generator.formatWhere<any>([
         {name: "Andrew", age: 10},
         {city: "London", address: "Time Square"},
      ])
      expect(actual).toBe("(`name` = ? AND `age` = ?) OR (`city` = ? AND `address` = ?)")
   })

   test('getValues with object', () => {
      const actual = generator.getWhereValues<any>({name: "Andrew", age: 10})
      expect(actual).toEqual(["Andrew", 10])
   })

   test('getValues with array', () => {
      const actual = generator.getWhereValues<any>([
         {name: "Andrew", age: 10},
         {city: "London", address: "Time Square"},
      ])
      expect(actual).toEqual(["Andrew", 10, "London", "Time Square"])
   })
})
