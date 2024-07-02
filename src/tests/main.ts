import { MySQL } from "../config/database";
import { AuthModel } from "../constants/classes";
import { Authenticator } from "../index";
import user from "./models/user";

const database = new MySQL({
    host: "localhost",
    user: "root",
    password: "",
    database: "authentify",
    port: 3306,
});

const auth = new Authenticator({
    version: 1,
    database,
    models : [user]
});

const login = auth.controller({
    name: "login",
    description: "Login a user",
})

auth.route("/auth/login").post(login);
auth.route("/auth/register");
auth.route("/auth/forgot-password");
auth.route("/auth/reset-password");
auth.route("/auth/verify-email");
auth.route("/auth/verify-phone");
auth.route("/auth/with/google");
auth.route("/auth/with/facebook");
auth.route("/auth/with/x");

auth.listen(3000);