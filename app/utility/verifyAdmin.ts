import { generate } from "generate-password";
import shortid from "shortid";
import UserModel from "../modules/user/user.schema";

export const verifyAdmin = async () => {
    try {
        const result = await UserModel.findOne({ userRole: 'admin' })
        if (!result) {
            const userData = {
                userID: shortid.generate(),
                password: generate(),
                userRole: 'admin',
                name: 'chinmay',
                age:10,
                email: 'chinmay@gmail.com'
            }
            await UserModel.create(userData);
            console.log("Created First Admin/Manager")
        }
        else {
            console.log(`Admin/Manager Already present`)
        }
    }
    catch (e) {
        console.log(e);
    }
}