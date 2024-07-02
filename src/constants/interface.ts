import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "../config/database";
import { AuthModel } from "./classes";

interface AuthenticatorConfiguration{
    version: number,
    database:  MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer,
    models: AuthModel[]
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

interface AuthenticatorModelConfiguration{
    name: string;
    description: string;
    fields: { [key: string]: any};
}

interface ORMConfiguration{
    table_name: string;
    fields: { [key: string]: any};
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

export type { AuthenticatorConfiguration, AuthenticatorModelConfiguration, AuthenticatorControllerConfiguration, MySQLConfiguration, ORMConfiguration };