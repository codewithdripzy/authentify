import dotenv from "dotenv";
import { AuthModel } from "../constants/classes";
import { MariaDB, MicrosoftSQLServer, MongoDB, MySQL, OracleDB, PostGres, Snowflake, SQLite } from "../config/database";

class UserModel{
    database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
    schema : AuthModel;

    constructor(database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer){
        dotenv.config();
        this.database = database;
        this.schema = new AuthModel({
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
                    field : "othername",
                    type : "VARCHAR",
                    length : 32,
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
                    field : "gender",
                    type : "INT",
                    length: 11
                },
                {
                    field : "dob",
                    type : "DATE",
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
    }
}

class AdminModel{

}


export { UserModel, AdminModel };