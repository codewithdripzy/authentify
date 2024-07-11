import { Request, Response } from "express";
import { Authenticator } from "../..";
import { AuthModel } from "../../constants/classes";
import { EmailPassswordAuthNoVerification, EmailPasswordAuthWithVerification, EmailVerification, RegistrationWithEmailVerifcation } from "../../controllers/builtins";
import { model } from "mongoose";

class Controller{
    private auth : Authenticator;

    constructor(auth : Authenticator){
        this.auth = auth
    }

    login(model : AuthModel){
        return this.auth.controller({
            name: "login",
            description: "Login a user",
            model: model,
            handler : EmailPasswordAuthWithVerification
        })
    }
    
    register(model : AuthModel){
        return this.auth.controller({
            name: "register",
            description: "Login a user",
            model: model,
            handler : RegistrationWithEmailVerifcation
        })
    }

    verify(model : AuthModel){
        return this.auth.controller({
            name: "register",
            description: "Login a user",
            model: model,
            handler : EmailVerification
        })
    }
}

export default Controller;