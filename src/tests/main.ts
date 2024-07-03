// import { AuthModel } from "../constants/classes";
import { Request, Response } from "express";
import { Authenticator } from "../index";
import { mysqldb, mongo } from "./config/database";
import user from "./models/user";
import { FacebookAuth, GithubAuth, GoogleAuth, TwitterAuth } from "../oauth";

const auth = new Authenticator({
    name : "Authify",
    version: 1,
    database: mysqldb,
    models : [user],
});

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const x = new TwitterAuth();
const github = new GithubAuth();

const login = auth.controller({
    name: "login",
    description: "Login a user",
    handler : (req : Request, res : Response) => {
        console.log(req);
        
        return res.status(200).json({
            message : "You just got authentified"
        })
        // if(user.findOne()){

        // }
    }
});

const register = auth.controller({
    name: "register",
    description: "Login a user",
    handler : (req : Request, res : Response) => {
        console.log(req);
        
        return res.status(200).json({
            message : "You just got authentified"
        })
        // if(user.findOne()){

        // }
    }
})

auth.routes = [
    auth.route("/auth/login").post(login),
    auth.route("/auth/register").post(register),
    auth.route("/auth/forgot-password").post(login),
    auth.route("/auth/reset-password").post(login),
    auth.route("/auth/verify-email").post(login),
    auth.route("/auth/verify-phone").post(login),
    auth.route("/auth/with/google").post(login),
    auth.route("/auth/with/facebook").post(login),
    auth.route("/auth/with/x").post(login)
];
auth.listen(3000);