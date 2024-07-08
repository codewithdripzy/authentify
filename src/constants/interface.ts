import { Request, Response, Router } from "express";
import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "../config/database";
import { AuthModel, Database } from "./classes";
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
    database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
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
    name : string;
    description : string;
    model : AuthModel;
    handler : (model : AuthModel, req : Request, res : Response) => void;
}

interface ModelConfiguration{
    secret : string;
}

export type { 
    AuthenticatorConfiguration,
    AuthenticatorModelConfiguration,
    AuthenticatorControllerConfiguration,
    MySQLConfiguration,
    MongoDBConfiguration,
    ORMConfiguration,
    SqlType,
    ModelConfiguration
};