import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { permit } from "../../utility/permit";
import { ResponseHandler } from "../../utility/response-handler";
import userService from "./user.service";

// Create Subrouter
const router = Router();

router.post("/registerEmployee", permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.registerUser(req.body);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
})


router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
})

router.get("/getAllEmployee", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
})

export default router;