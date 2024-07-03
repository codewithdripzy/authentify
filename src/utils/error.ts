import { DbORM } from "..";
import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "../config/database";

async function handleDBError(db : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer, error : { code: string } | any, method : () => void) : Promise<boolean>{
    // check for errror code for mysql
    if(error.code && error!.code === "ECONNREFUSED"){
        console.error("Make sure your database server is running 👨‍💻");
    }else if(error.code && error!.code === "ER_ACCESS_DENIED_ERROR"){
        console.error("Make sure your database credentials are correct 👨‍💻");
    }else if(error.code && error!.code === "ER_BAD_DB_ERROR"){
        console.error("Database was not found! don't fret, we're creating one for you 👨‍💻");
        // create database if not exists
        if(await new DbORM(db).createDatabase(db.database as string)){
            method();
            return true;
        }
        console.error("Unable to create database 😪");
        return false;
    }

    // check for mongoose error

    // check for mongodb error
    return false;
}

export { handleDBError }