import { NextFunction, Router, Request, Response } from "express";
import { permit } from "../../utility/permit";
import { ResponseHandler } from "../../utility/response-handler";
import serviceServices from "./service.services";

const router = Router();

router.post("/registerService", async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceServices.registerService(req.body);
    res.send(new ResponseHandler(result));
})

router.get("/getAllServices", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await serviceServices.getAllServices();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
})

export default router;