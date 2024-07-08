import { Request, Response } from "express"
import { AuthModel } from "../constants/classes";
import { DbORM } from "..";
import { Password, Validator } from "auth-validify";
import JWT from "../utils/jwt";
import AuthMailer from "../utils/mailer";

const jwt = new JWT();

// login authentication controller with jwt
const EmailPassswordAuthNoVerification = async (model : AuthModel, req : Request, res : Response) => {
    try {
        // check if email and password values is not empty or null
        const validator = new Validator();
        const psw = new Password();
        const db = new DbORM(model.database);
        const { email, password } = req.body;

        if(email){
            if(password){                
                // check if email and password is valid 
                if(validator.isEmail(email)){
                    if(validator.isValidPassword(password)){
                        // check if email exists in db
                        const [state, queryRes] = await db.findOne(model.name, { email }) as [boolean, { [key : string] : any}]
                        
                        if(state){
                            // check if password is correct
                            if(psw.verify(password, queryRes.password)){
                                const token = jwt.sign({ email, password, access_code: queryRes.access_code }, model.options?.secret ?? "", { expiresIn: "1d" });
                                const refreshToken = jwt.sign({ token }, model.options?.secret ?? "", { expiresIn: "7d" });

                                const data : {[key : string] : any}= {};

                                // remove password and access_code fields from queryRes
                                for(const key in queryRes){
                                    if(key !== "password" && key !== "access_code" && key !== "status"){
                                        data[key] = queryRes[key];
                                    }
                                }

                                data["token"] = token;
                                data["refreshToken"] = refreshToken;

                                return res.status(200).json({
                                    success: true,
                                    message: `Welcome${queryRes.firstname ? (", " + queryRes.firstname + " 👋🏽") : ""}`,
                                    data,
                                });
                            }else{
                                return res.status(400).json({
                                    error: false,
                                    message : "Incorrect Password"
                                });
                            }
                        }else{
                            return res.status(400).json({
                                error: true,
                                message : "Email Address does not exist"
                            });
                        }
                        
                    }else{
                        return res.status(400).json({
                            error: true,
                            message : "Password is invalid",
                        });
                    }
                }else{
                    return res.status(400).json({
                        error: true,
                        message : "Email Address is invalid",
                    });
                }
            }else{
                return res.status(400).json({
                    error: true,
                    message : "Passsword Address is required"
                });
            }
        }else{
            return res.status(401).json({
                error: true,
                message : "Email Address is required",
            });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            error: true,
            message : "Something went wrong 🥲",
            debug: error,
        });
    }
}

const EmailPasswordAuthWithVerification = async (model : AuthModel, req : Request, res: Response) => {
    try {
        const mailer = new AuthMailer();
        const validator = new Validator();
        const psw = new Password();
        const db = new DbORM(model.database);

        const { email, password } = req.body;

        if(email){
            if(password){                
                // check if email and password is valid 
                if(validator.isEmail(email)){
                    if(validator.isValidPassword(password)){
                        // check if email exists in db
                        const [state, queryRes] = await db.findOne(model.name, { email }) as [boolean, { [key : string] : any}]
                        
                        if(state){
                            // check if password is correct
                            if(psw.verify(password, queryRes.password)){
                                // send email verification
                                const token = jwt.sign({ email, password, access_code: queryRes.access_code }, model.options?.secret ?? "", { expiresIn: "1d" });
                                const data : {[key : string] : any}= {};

                                console.log(token);
                                
                                // if(){

                                // }

                                // remove password and access_code fields from queryRes
                                for(const key in queryRes){
                                    if(key !== "password" && key !== "access_code" && key !== "status"){
                                        data[key] = queryRes[key];
                                    }
                                }

                                return res.status(200).json({
                                    success: true,
                                    message: `Welcome${queryRes.firstname ? (", " + queryRes.firstname + " 👋🏽") : ""}`,
                                    data,
                                });
                            }else{
                                return res.status(400).json({
                                    error: false,
                                    message : "Incorrect Password"
                                });
                            }
                        }else{
                            return res.status(400).json({
                                error: true,
                                message : "Email Address does not exist"
                            });
                        }
                        
                    }else{
                        return res.status(400).json({
                            error: true,
                            message : "Password is invalid",
                        });
                    }
                }else{
                    return res.status(400).json({
                        error: true,
                        message : "Email Address is invalid",
                    });
                }
            }else{
                return res.status(400).json({
                    error: true,
                    message : "Passsword Address is required"
                });
            }
        }else{
            return res.status(401).json({
                error: true,
                message : "Email Address is required",
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: true,
            message : "Something went wrong 🥲",
            debug: error,
        });
    }
}

// Registeration with email verifcation
const RegisterationWithEmailVerifcation = async (model : AuthModel, req : Request, res : Response) => {

}

const RegisterationWithPhoneVerfication = async (model : AuthModel, req : Request, res : Response) => {

}

const EmailVerification = async (model : AuthModel, req : Request, res : Response) => {

}

const PhoneVerification = async (model : AuthModel, req : Request, res : Response) => {
    
}
// const CustomLoginAuth = (fields, req, res) => {
//     // checks if fields exists in db before checking for value
// }


// verify email controller with jwt
// verify phone number controller with jwt

export { EmailPassswordAuthNoVerification, EmailPasswordAuthWithVerification, RegisterationWithEmailVerifcation, RegisterationWithPhoneVerfication, EmailVerification, PhoneVerification }