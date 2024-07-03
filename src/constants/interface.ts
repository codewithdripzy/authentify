import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "../config/database";
import { AuthModel } from "./classes";
import { MongoDriverType } from "./enums";

interface AuthenticatorConfiguration{
    name : string;
    version: number;
    database:  MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
    models: AuthModel[];
}

interface MySQLConfiguration{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl?: boolean;
    sslKey?: string;
}

interface MongoDBConfiguration{
    driver?: MongoDriverType;
    uri? : string;
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl?: boolean;
    sslKey?: string;
}

interface AuthenticatorModelConfiguration{
    name: string;
    description: string;
    fields: SqlType[];
}

interface SqlType{
    field : string,
    type : string,
    length? : number,
}

interface ORMConfiguration{
    table_name: string;
    fields: SqlType[];
}


// interface MongoDBConfiguration{
//     host: string;
//     user: string;
//     password: string;
//     database: string;
//     port: number;
//     ssl?: boolean;
//     sslKey?: string;
// }

interface AuthenticatorControllerConfiguration{
    
}

export type { 
    AuthenticatorConfiguration,
    AuthenticatorModelConfiguration,
    AuthenticatorControllerConfiguration,
    MySQLConfiguration,
    MongoDBConfiguration,
    ORMConfiguration,
    SqlType
};