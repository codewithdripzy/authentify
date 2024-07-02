import mysql, { Connection as MySQLConnection, createConnection } from "mysql2/promise";
import { Connection as MongoConnection, connect } from "mongoose";
import postgres from "pg";
// import mariadb from "mariadb";
import sqlite3 from "sqlite3";
import oracle from "oracledb";
import snowflake from "snowflake-sdk";
import mssql from "mssql";
import mongodb from "mongodb";

import { MySQLConfiguration } from "../constants/interface";
import { Database } from "../constants/classes";
import { DatabaseType } from "../constants/enums";

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