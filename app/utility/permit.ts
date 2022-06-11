import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "./response-handler";


export const permit = (permittedRoles: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { userRole } = res.locals['userData'];
        if (permittedRoles === userRole) {
            next();
        }
        else {
            return res.send(new ResponseHandler({ message: "Only Authorized Person Can Access This Page" }))
        }
    }
}

