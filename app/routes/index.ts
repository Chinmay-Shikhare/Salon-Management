import cors from "cors";
import helmet from "helmet";
import { Application, json, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../utility/response-handler";
import { excludedPath, routes } from "./routes.data";
import { authorize } from "../utility/authorize";
import { verifyAdmin } from "../utility/verifyAdmin";

// registerMiddlewares function which registers all the middlewares
export const registerMiddlewares = async (app: Application) => {

    app.use(cors());
    app.use(json());
    app.use(helmet());

    await verifyAdmin();
    app.use(authorize(excludedPath));

    // Registering all the routes
    for (let route of routes) {
        app.use(route.path, route.router)
    }

    // Error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err))
    })
}