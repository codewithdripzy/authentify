// import { AuthModel } from "../constants/classes";
import { Authenticator } from "../index";
import { mysqldb, mongo } from "./config/database";
import { FacebookAuth, GithubAuth, GoogleAuth, TwitterAuth } from "../oauth";
import Model from "./models/user";
import Controller from "./controller/main";
import { UserModel } from "../model/builtins";

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const x = new TwitterAuth();
const github = new GithubAuth();

const usr = new UserModel(mysqldb).schema;

const auth = new Authenticator({
    name : "Authify",
    version: 1,
    database: mysqldb,
    models : [usr],
});

const loginController = new Controller(auth).login(usr);
const registerController = new Controller(auth).register(usr);
const verifyController = new Controller(auth).verify(usr);

auth.routes = [
    // for authentication
    auth.route("/auth/login").post(loginController),
    auth.route("/auth/register").post(registerController),
    auth.route("/auth/forgot-password").post(loginController),
    auth.route("/auth/reset-password").post(loginController),
    auth.route("/auth/verify-email").post(verifyController),
    auth.route("/auth/verify-phone").post(loginController),
    auth.route("/auth/with/google").post(google.auth),
    auth.route("/auth/with/facebook").post(facebook.auth),
    auth.route("/auth/with/x").post(x.auth),
    auth.route("/auth/with/github").post(github.auth)
];

auth.listen(3000);