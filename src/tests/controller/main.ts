import { Request, Response } from "express";
import { Authenticator } from "../..";
import { AuthModel } from "../../constants/classes";
import { EmailPassswordAuthNoVerification, EmailVerification } from "../../controllers/builtins";
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
            handler : EmailPassswordAuthNoVerification
        })
    }
    
    register(model : AuthModel){
        return this.auth.controller({
            name: "register",
            description: "Login a user",
            model: model,
            handler : (model : AuthModel, req : Request, res : Response) => {
                return res.status(200).json({
                    message : "You just got authentified"
                })
                // if(user.findOne()){
        
                // }
            }
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