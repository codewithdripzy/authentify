import { MySQL, MongoDB, PostGres, MariaDB, SQLite, OracleDB, Snowflake, MicrosoftSQLServer } from "../config/database";
import { DatabaseType } from "./enums";
import { AuthenticatorModelConfiguration, ModelConfiguration, SqlType } from "./interface";

class Database{
    name : string;
    type : DatabaseType;

    constructor(type : DatabaseType, name : string = "default"){
        this.name = name;
        this.type = type;
        // create database if not exists
    }

}

class AuthModel{
    name : string;
    description : string;
    fields : SqlType[];
    database : MySQL | MongoDB | PostGres | MariaDB | SQLite | OracleDB | Snowflake | MicrosoftSQLServer;
    options? : ModelConfiguration

    constructor({ name, description, fields, database, options } : AuthenticatorModelConfiguration){
        this.name = name;
        this.description = description;
        this.fields = fields;
        this.database = database;
        this.options = options;
    }

    findOne() : boolean{
        return false;
    }

    fieldExists(){

    }

    validate(reqBody : object, optionalFields : string[] = []) : string[]{
        const missing_fields = [];

        for(const i in this.fields){
            const fld = this.fields[i];
            
            // skip fields that are in optionalFields
            if(optionalFields.includes(fld.field)){
                continue;
            }else{
                // check if field exists in reqBody
                if(!reqBody.hasOwnProperty(fld.field)){
                    missing_fields.push(fld.field);
                }
            }
        }

        return missing_fields;
    }
}

class AuthController{
    name : string;
    description : string;
    model : AuthModel;

    constructor(name : string, description : string, model : AuthModel){
        this.name = name;
        this.description = description;
        this.model = model;
    }
}

export { Database, AuthModel, AuthController };