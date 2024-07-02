import { AuthModel } from "../../constants/classes";

const user = new AuthModel({
    name: "user",
    description: "User model",
    fields : {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        phone: String,
        verified: Boolean,
        emailVerified: Boolean,
        phoneVerified: Boolean,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }
});

export default user;