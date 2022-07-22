import {User} from "./demo/User";
import {database} from "./decorators/store";
import {createTable} from "./sql/createTable";
import * as mysql from "promise-mysql"
import {asyncMap} from "./utils/asyncMap";
import {City} from "./demo/City";


const entities = [User, City]
const statements = database.tables.map(createTable)
statements.forEach(st => console.log(st))


// mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "sgHui780156@#78rTy!%",
//    database: "typeorm"
// }).then(async (connection) => {
//    const statements = database.tables.map(createTable)
//    statements.forEach(console.log)
//
//    const results = await asyncMap(statements, (statement) => {
//       return connection.query(statement);
//    })
//    console.log(results)
//    const res2 = await connection.query("SHOW TABLES;")
//    console.log(res2)
// })
