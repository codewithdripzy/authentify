import { AuthModel } from "../../constants/classes";

const user = new AuthModel({
    name: "user",
    description: "User model",
    fields : [
        {
            field : "id",
            type : "INT",
            length : 11
        },
        {
            field : "firstname",
            type : "VARCHAR",
            length : 32
        },
        {
            field : "lastname",
            type : "VARCHAR",
            length : 32
        },
        {
            field : "username",
            type : "VARCHAR",
            length : 32
        },
        {
            field : "email",
            type : "TEXT",
        },
        {
            field : "password",
            type : "VARCHAR",
            length : 32
        },
        {
            field : "tel",
            type : "VARCHAR",
            length: 16
        },
        {
            field : "access_code",
            type : "VARCHAR",
            length: 32
        },
        {
            field : "status",
            type : "INT",
            length: 11
        },
        {
            field : "created",
            type : "DATE",
        },
        {
            field : "modified",
            type : "TIMESTAMP"
        }
    ]
    // methods : []
});

export default user;