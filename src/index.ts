import cors from "cors";
import express, { Request, Response, Router } from "express";
import { AuthenticatorConfiguration, AuthenticatorControllerConfiguration, ORMConfiguration } from "./constants/interface";
import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "./config/database";
import { AuthenticatorController } from "./constants/declarations";
import { AuthModel, Database } from "./constants/classes";
import { ResultSetHeader } from "mysql2";

class Authenticator{
    protected app : express.Application;
    public version : number;
    public database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
    public models : AuthModel[];

    constructor({ version, database, models } : AuthenticatorConfiguration){
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.version = version;
        this.database = database;
        this.models = models;

        this.setup();
    }

    private async setup(){
        if(await this.setupDatabase()){
            this.setupModels();
        }
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

            // check for errror code for mysql
            if(error.code && error!.code === "ECONNREFUSED"){
                console.error("Make sure your database server is running 👨‍💻");
            }else if(error.code && error!.code === "ER_ACCESS_DENIED_ERROR"){
                console.error("Make sure your database credentials are correct 👨‍💻");
            }else if(error.code && error!.code === "ER_BAD_DB_ERROR"){
                console.error("Database was not found! don't fret, we're creating one for you 👨‍💻");
                // create database if not exists
                if(await new DbORM(this.database).createDatabase(this.database.database as string)){
                    this.setupDatabase();
                    return true;
                }
                console.error("Unable to create database 😪");
                return false;
            }
            return false;
        }
    }

    private setupModels(){
        // loop through models and create tables
        const db = new DbORM(this.database);

        this.models.forEach((model : AuthModel) => {
            if(!db.tableExists(model.name)){
                db.createTable({
                    table_name: model.name, 
                    fields: model.fields
                });
            }
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
        }
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

    async createDatabase(database : string) : Promise<boolean> {
        try {
            console.log("Creating database...");

            this.database.database = undefined;
            const db = await this.database.getConnection();

            switch(this.database.type){
                case "mysql":
                    // create database if not exists
                    const [res, err] = await db.query(`CREATE DATABASE IF NOT EXISTS ${database}`) as [ResultSetHeader, []];

                    if(err) return false && console.log("Unfortunately, we couldn't create the database 😪", "\n Instead we got this error: ", err);
                    if(res){
                        console.log(`Database '${database}' created successfully 🚀🎉`);
                        return true;
                    }

                    break;
                case "mongodb":
                    break;
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

    createTable({ table_name, fields } : ORMConfiguration){
        // this.database.getConnection().query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP)");
        switch(this.database.type){
            case "mysql":
        //         this.database.getConnection().query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP)");
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

    tableExists(table_name : string) : boolean{
        // this.database.getConnection().query("SHOW TABLES LIKE 'users'");
        return false;
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

export { Authenticator, DbORM, Oauth};