import { DatabaseType } from "./enums";
import { AuthenticatorModelConfiguration } from "./interface";

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
    fields : { [key: string]: any }

    constructor({ name, description, fields } : AuthenticatorModelConfiguration){
        this.name = name;
        this.description = description;
        this.fields = fields;
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