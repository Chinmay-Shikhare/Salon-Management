import express from "express";
import { connectToMongo } from "./connections/mongo.connection";
import { registerMiddlewares } from "./routes";

export const startServer = async () => {
    try {
        // Creates a new express application for you.
        const app = express();

        registerMiddlewares(app);
        await connectToMongo();

        // Extract the PORT from environment variables 
        const { PORT } = process.env;

        // Start listening on PORT
        app.listen(
            PORT,
            () => console.log(`SERVER STARTED ON PORT ${PORT}`)
        )
    } catch (e) {
        console.log(e);
    }

}