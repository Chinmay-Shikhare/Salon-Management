import UserModel from "./user.schema";
import { IUser } from "./user.types";


const registerUser = (user: IUser) => UserModel.create(user);

const getAllUsers = () => UserModel.find();

const login = (email: string, password: string) => UserModel.findOne({ email: email, password: password })

export default {
    registerUser,
    getAllUsers,
    login
}