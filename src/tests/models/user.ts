import { AuthModel } from "../../constants/classes";
import { MariaDB, MicrosoftSQLServer, MongoDB, MySQL, OracleDB, PostGres, Snowflake, SQLite } from "../../config/database";
import dotenv from "dotenv";

class Model{
    database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;

    constructor(database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer){
        dotenv.config();
        this.database = database;
    }

    

    user() : AuthModel {
        const user = new AuthModel({
            name: "user",
            description: "User model",
            database: this.database,
            options: {
                secret: process.env.USER_MODEL_SECRET ?? "",
            },
            fields : [
                {
                    field : "id",
                    type : "INT",
                    length : 11
                },
                {
                    field : "firstname",
                    type : "VARCHAR",
                    length : 32
                },
                {
                    field : "lastname",
                    type : "VARCHAR",
                    length : 32
                },
                {
                    field : "username",
                    type : "VARCHAR",
                    length : 32
                },
                {
                    field : "email",
                    type : "TEXT",
                },
                {
                    field : "password",
                    type : "VARCHAR",
                    length : 32
                },
                {
                    field : "tel",
                    type : "VARCHAR",
                    length: 16
                },
                {
                    field : "access_code",
                    type : "VARCHAR",
                    length: 32
                },
                {
                    field : "status",
                    type : "INT",
                    length: 11
                },
                {
                    field : "created",
                    type : "DATE",
                },
                {
                    field : "modified",
                    type : "TIMESTAMP"
                }
            ]
            // methods : []
        });

        return user;
    }
}


export default Model;