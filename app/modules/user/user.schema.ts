import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.types";

class UserSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            userRole: {
                type: String,
                required: true
            }
        },{ timestamps: true })
    }
}

type userType = Document & IUser;
const UserModel = model<userType>('user', new UserSchema());
export default UserModel;