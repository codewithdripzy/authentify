// import { AuthModel } from "../constants/classes";
import user from "./models/user";
import Controller from "./controller/main";
import { Authenticator } from "../index";
import { Request, Response } from "express";
import { mysqldb, mongo } from "./config/database";
import { FacebookAuth, GithubAuth, GoogleAuth, TwitterAuth } from "../oauth";
import Model from "./models/user";

const model = new Model(mysqldb);
const usr = model.user();

const auth = new Authenticator({
    name : "Authify",
    version: 1,
    database: mysqldb,
    models : [],
});

const controller = new Controller(auth);

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const x = new TwitterAuth();
const github = new GithubAuth();

auth.routes = [
    // for authentication
    auth.route("/auth/login").post(controller.login(usr)),
    auth.route("/auth/register").post(controller.login(usr)),
    auth.route("/auth/forgot-password").post(controller.login(usr)),
    auth.route("/auth/reset-password").post(controller.login(usr)),
    auth.route("/auth/verify-email").post(controller.login(usr)),
    auth.route("/auth/verify-phone").post(controller.login(usr)),
    auth.route("/auth/with/google").post(google.auth),
    auth.route("/auth/with/facebook").post(facebook.auth),
    auth.route("/auth/with/x").post(x.auth),
    auth.route("/auth/with/github").post(github.auth)
];

auth.listen(3000);