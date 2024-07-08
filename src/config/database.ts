import mysql, { Connection as MySQLConnection, createConnection } from "mysql2/promise";
import { Connection as MongoConnection, Mongoose, connect } from "mongoose";
import postgres from "pg";
// import mariadb from "mariadb";
import sqlite3 from "sqlite3";
import oracle from "oracledb";
import snowflake from "snowflake-sdk";
import mssql from "mssql";
import { MongoClient } from "mongodb";

import { MongoDBConfiguration, MySQLConfiguration } from "../constants/interface";
import { Database } from "../constants/classes";
import { DatabaseType, MongoDriverType } from "../constants/enums";

class MySQL extends Database{
    host: string;
    user: string;
    password: string;
    database?: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    }
}

class MongoDB extends Database{
    uri? : string;
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    driver : MongoDriverType;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ uri, host, database, user, password, port = 3306, ssl = false, sslKey, driver = MongoDriverType.MONGOOSE } : MongoDBConfiguration){
        super(DatabaseType.MONGODB);
        
        this.driver = driver;
        this.uri = uri;
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MongoClient | Mongoose | null> {
        if(this.driver == MongoDriverType.MONGOOSE){
            if(this.uri){
                // print
                return await connect(this.uri);
            }else if(this.user && this.password){
                return await connect(`mongodb+srv://${this.user}:${this.password}@${this.host}/${this.database}/?retryWrites=true&w=majority`, {
                });
            }else{
                console.log("No Credentials Provide 🤔🫤🤨");
                return null;
            }
        }else if(this.driver == MongoDriverType.MONGODB){
            if(this.uri !== undefined){
                const client = new MongoClient(this.uri, {});
                const conn = await client.connect();

                return conn;
            }

            // URI is required for mongoDB driver
            console.log("Uri Connection string is rquired for mongodb driver");
            return null;
        }else{
            console.log(`No Mongo driver of type '${this.driver}' found.`);
            return null;
        }
    }
}

class PostGres extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

class MariaDB extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

class SQLite extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

class OracleDB extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

class Snowflake extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }

    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

class MicrosoftSQLServer extends Database{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl: boolean | undefined;
    sslKey: string | undefined;
    
    constructor({ host, database, user, password, port = 3306, ssl = false, sslKey } : MySQLConfiguration){
        super(DatabaseType.MYSQL);
        
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
        this.ssl = ssl;
        this.sslKey = sslKey;
    }
    
    async getConnection() : Promise<MySQLConnection> {
        return createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
            // ssl: this.ssl,
        });
    
    }
}

export { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer }