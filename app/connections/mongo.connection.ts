import { connect } from "mongoose"

export const connectToMongo = async () => {
    try {
        const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
        if (MONGO_CONNECTION) {
            await connect(MONGO_CONNECTION);
            console.log("Connect to database successfully");
            return true;
        }
    } catch (e) {
        throw { message: "Could not connect to mongodb" }
    }
}