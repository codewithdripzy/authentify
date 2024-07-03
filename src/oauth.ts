import { NextFunction, Request, Response } from "express"
import { AuthenticatorController } from "./constants/declarations"

class GoogleAuth {
    auth() : AuthenticatorController{
        return (req : Request, res : Response) =>{

        }
    }
}

class FacebookAuth {
    auth() : AuthenticatorController{
        return (req : Request, res : Response) =>{
            
        }
    }
}

class TwitterAuth {
    auth() : AuthenticatorController{
        return (req : Request, res : Response) =>{
            
        }
    }
}

class GithubAuth {
    auth() : AuthenticatorController{
        return (req : Request, res : Response) =>{
            
        }
    }
}


export { GoogleAuth, FacebookAuth, TwitterAuth, GithubAuth }