import cors from "cors";
import SqlParser from "./utils/sql";
import express, { NextFunction, Request, Response, Router } from "express";
import { Mongoose } from "mongoose";
import { MongoClient } from "mongodb";
import { AuthModel, Database } from "./constants/classes";
import { Connection, ResultSetHeader } from "mysql2/promise";
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

    private setupRoutes(){
        // set version defined by developer
        // setup default and fallback routes
        this.app.use("/api/v:version/", (req : Request, res : Response, next : NextFunction)=>{
            req.body = {
                v : this.version
            }
            verifyAPI(req, res, next)
        });
        this.app.all("/api/v:version/", (req : Request, res : Response, next : NextFunction)=>{
            // user defined routes
            this.routes.map(route => {
                route(req, res, next);
                // return route.use("/", (req : Request, res : Response) => {
                //     console.log(req.path);
                // });
            });
            this.app.use("/", noRouteFound);
        });
    }

    public route(path : string){
        const router : Router = express.Router();

        return { 
            get(controller : ()=> void){
                // router.get(path, callback);
            },

            post(controller : AuthenticatorController) : Router{
                // const expressController = 
                return router.post(path, (req : Request, res : Response) => {
                    controller(req, res);
                });
            },

            delete(controller : ()=> void){
                // router.get(path, callback);
            },

            put(controller : ()=> void){
                // router.get(path, callback);
            },

            patch(controller : ()=> void){
                // router.get(path, callback);
            },

            options(controller : ()=> void){
                // router.get(path, callback);
            },

            head(controller : ()=> void){
                // router.get(path, callback);
            },

            connect(controller : ()=> void){
                // router.get(path, callback);
            },

            trace(controller : ()=> void){
                // router.get(path, callback);
            },

            all(controller : ()=> void){
                // router.get(path, callback);
            },

            use(controller : ()=> void){
                // router.get(path, callback);
            },

            route(path : string) : Function{
                return this.route(path);
            }
        };
    }

    public controller({} : AuthenticatorControllerConfiguration) : AuthenticatorController{
        return (req : Request, res : Response) => {
            try{
                res.send("Hello World");
            }catch(err){
                res.status(500).send("Internal Server Error");
            }
        }
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
            console.log("Creating database...");

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
                        const db = this.database.getConnection() as unknown as Mongoose;
                        return false;
                    }else{
                        const db = this.database.getConnection() as unknown as MongoClient;
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