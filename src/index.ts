import cors from "cors";
import SqlParser from "./utils/sql";
import express, { NextFunction, Request, Response, Router } from "express";
import { Mongoose } from "mongoose";
import { MongoClient } from "mongodb";
import { AuthModel, Database } from "./constants/classes";
import { Connection, FieldPacket, ResultSetHeader } from "mysql2/promise";
import { DatabaseType, MongoDriverType } from "./constants/enums";
import { AuthenticatorController } from "./constants/declarations";
import { defaulFallback, noRouteFound, verifyAPI } from "./controllers/default";
import { AuthenticatorConfiguration, AuthenticatorControllerConfiguration, ORMConfiguration } from "./constants/interface";
import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "./config/database";
import { handleDBError } from "./utils/error";

class Authenticator{
    protected app : express.Application;
    public name : string;
    public version : number;
    public database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
    public models : AuthModel[];
    public routes : Router[] = [];
    public controllers : AuthenticatorController[] = [];
    public base_path = "/api/v:version"

    constructor({ name, version, database, models } : AuthenticatorConfiguration){
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.name = name;
        this.version = version;
        this.database = database;
        this.models = models;

        this.setup();
    }

    public setRoutes(routes : Router[]){
        this.routes = routes;
    }

    public setControllers(controllers : AuthenticatorController[]){
        this.controllers = controllers;
    }

    private async setup(){
        if(await this.setupDatabase()){
            if(this.setupModels()){
                this.setupRoutes();
            }
        }
        // else{
        //     console.log(`Something went wrong 😑, unable to connect to '${this.database.type}' database.\ncheck database your configuration and try again 😪`);
        // }
    }

    private async setupDatabase() : Promise<boolean>{        
        try {
            // try connecting to database
            const connectionState = await this.database.getConnection();
            
            if(connectionState){                
                console.log(`Connected to database 🚀🎉`);
                return true;
            }

            return false;
        } catch (error : { code: string } | any) {
            console.error("Unable to connect to database 😪");
            const res = handleDBError(this.database, error, () => this.setupDatabase());

            return res;
        }
    }

    private setupModels() : boolean{
        try {
            // loop through models and create tables
            const db = new DbORM(this.database);

            this.models.forEach(async (model : AuthModel) => {
                if(!await db.tableExists(model.name)){
                    db.createTable({
                        table_name: model.name, 
                        fields: model.fields
                    });
                }
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    private setupRoutes() {
        this.app.use(this.base_path, (req: Request, res: Response, next: NextFunction) => {
            req.body.v = this.version;
            verifyAPI(req, res, next);
        });

        this.routes.forEach(route => {
            this.app.use(route);
        });

        // Fallback route for 404
        this.app.use("/", noRouteFound);
    }

    public route(path: string) {
        const router: Router = express.Router();

        return {
            get: (controller: AuthenticatorController) => {
                router.get(`${this.base_path}${path}`, (req: Request, res: Response) => controller(req, res));
                return router;
            },
            post: (controller: AuthenticatorController) => {
                router.post(`${this.base_path}${path}`, (req: Request, res: Response) => controller(req, res));
                return router;
            },
            delete: (controller: AuthenticatorController) => {
                router.delete(`${this.base_path}${path}`, (req: Request, res: Response) => controller(req, res));
                return router;
            },
            put: (controller: AuthenticatorController) => {
                router.put(`${this.base_path}${path}`, (req: Request, res: Response) => controller(req, res));
                return router;
            },
            
            route(path : string) : Function{
                return this.route(path);
            }
        };
    }

    public controller(config : AuthenticatorControllerConfiguration) : AuthenticatorController{
        return (req: Request, res: Response) => {
            try {
                config.handler(config.model, req, res);
            } catch (err) {
                return res.status(500).send("Internal Server Error");
            }
        };
    }

    public listen(port : number){
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

class DbORM{
    database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;

    constructor(database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer){
        this.database = database
    }

    async createDatabase(datb : string) : Promise<boolean> {
        try {
            // console.log("Creating database...");
            this.database.database = undefined;

            switch(this.database.type){
                case DatabaseType.MYSQL:
                    // create database if not exists
                    const db = await this.database.getConnection() as unknown as Connection;
                    const [res, err] = await db!.query(`CREATE DATABASE IF NOT EXISTS ${datb}`) as [ResultSetHeader, []];

                    if(err) return false && console.log("Unfortunately, we couldn't create the database 😪", "\n Instead we got this error: ", err);
                    if(res){
                        console.log(`Database '${datb}' created successfully 🚀🎉`);
                        return true;
                    }

                    break;
                case DatabaseType.MONGODB:
                    
                    const database = this.database as MongoDB;

                    if(database.driver == MongoDriverType.MONGOOSE){
                        const db = await this.database.getConnection() as unknown as Mongoose;
                        return false;
                    }else{
                        const db = await this.database.getConnection() as unknown as MongoClient;
                        return false;
                    }
            //     case "postgresql":
            //         break;
            //     case "mariadb":
            //         break;
            //     case "sqlite3":
            //         break;
            //     case "oracle":
            //         break;
            //     case "mssql":
            //         break;
            //     case "snowflake":
            //         break;
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async createTable({ table_name, fields } : ORMConfiguration){
        switch(this.database.type){
            case DatabaseType.MYSQL:
                const db = await this.database.getConnection() as unknown as Connection;
                let query = `CREATE TABLE IF NOT EXISTS ${table_name} (id INT(11) UNIQUE PRIMARY KEY AUTO_INCREMENT,`;
                const parsedSql = SqlParser.parse(fields);

                query += (parsedSql + ");");
                
                const [res, flds] = await db!.query(query) as [[], []];
                console.log(res);
                
                break;
        //     case "mongodb":
        //         break;
        //     case "postgresql":
        //         break;
        //     case "mariadb":
        //         break;
        //     case "sqlite3":
        //         break;
        //     case "oracle":
        //         break;
        //     case "mssql":
        //         break;
        //     case "snowflake":
        //         break;
        }
    }

    async tableExists(table_name : string) : Promise<boolean>{
        switch (this.database.type) {
            case DatabaseType.MYSQL:
                try {
                    const db = await this.database.getConnection() as unknown as Connection;
                    const [res, field] = await db!.query(`SHOW TABLES LIKE '${table_name}'`) as [[], []];
        
                    if(res && res.length > 0){
                        return true;
                    }
                    
                    return false;
                } catch (error) {
                    console.log("Somthing went wrong 😥");
                    
                    console.log(error);
                    return false;
                }
            default:
                return false;
        }
    }

    async find(table_name : string, fields : { [key : string] : string }) : Promise<boolean>{
        return true;
    }

    async findOne(table_name : string, fields : { [key : string] : string }) : Promise<[boolean, { [key : string] : any}]>{
        try {
            switch (this.database.type) {
                case DatabaseType.MYSQL:
                    const db = await this.database.getConnection() as unknown as Connection;
                    let parsedSql = "";

                    for(const key in fields){
                        parsedSql += `${key} = '${fields[key]}'` + (Object.keys(fields).indexOf(key) < Object.keys(fields).length - 1 ? " AND " : "");
                    }

                    const query = `SELECT * FROM ${table_name} WHERE ${parsedSql} LIMIT 0,1;`;
                    const [res, field] = await db!.query(query) as [{ [key : string] : any }[], FieldPacket[]];

                    if(res && res.length > 0){
                        return [true, res[0] ?? {}] as [boolean, { [key : string] : any }];
                    }
                    return [false, []];
                
                case DatabaseType.MONGODB:
                    const database = this.database as MongoDB;

                    if(database.driver == MongoDriverType.MONGODB){
                        const mongodb = await this.database.getConnection() as unknown as MongoClient;
                        // console.log(mongodb.);
                    }else if(database.driver == MongoDriverType.MONGOOSE){
                        const mongoose = await this.database.getConnection() as unknown as Mongoose;
                    }else{
                        // invalid driver
                        throw [false, []] && console.log("Invalid Mongo driver provided");
                    }
                    
                default:
                    
                    
                    return [false, []];
            }
        } catch (error) {
            console.log(error);
            return [false, []];
        }
    }

    async add(table_name : string, values : { [key : string] : string }) : Promise<[boolean, { [key : string] : any}]>{
        return [false, {}];
    }
    
    dropTable(){
        // this.database.getConnection().query("DROP TABLE users");
    }
}

class Oauth{
    app : express.Application;

    constructor(){
        this.app = express();
    }

    listen(port : number){
        this.app.listen(port, () => {
            console.log(`Oauth server running on port ${port}`);
        });
    }
}

export { Authenticator, DbORM, Oauth };