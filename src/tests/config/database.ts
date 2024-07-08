import { MongoDB, MySQL } from "../../config/database";
import { MongoDriverType } from "../../constants/enums";

// test for mysql database
export const mysqldb = new MySQL({
    host: "localhost",
    user: "root",
    password: "",
    database: "authentify",
    port: 3306,
});

// test for monogoDB database
export const mongo =  new MongoDB({
    driver : MongoDriverType.MONGOOSE,
    host: "cluster0.rlr347o.mongodb.net",
    user: "emmanuelegbebi2004",
    password : "oegbebi22",
    database: "dominos-pizza",
    port : 3306
})
