import userRepo from "./user.repo";
import { IUser } from "./user.types";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const registerUser = (user: IUser) => userRepo.registerUser(user);

const getAllUsers = () => userRepo.getAllUsers();

const login = async (email: string, password: string) => {
    const userData = await userRepo.login(email, password);
    if (userData) {
        const { SECRET_KEY } = process.env;
        if (SECRET_KEY) {
            const token = sign(userData.toObject(), SECRET_KEY, { expiresIn: '20d' });
            const { userRole } = userData;
            const data = { token, userRole }
            return data;
        }
    }
}

export default {
    registerUser,
    getAllUsers,
    login
}