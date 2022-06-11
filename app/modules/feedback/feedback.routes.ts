import { NextFunction, Router, Response, Request } from "express";
import { permit } from "../../utility/permit";
import { ResponseHandler } from "../../utility/response-handler";
import feedbackService from "./feedback.service";

const router = Router();


router.post("/registerFeedback", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await feedbackService.registerFeedback(req.body);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});

router.get("/getFeedbacks", permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await feedbackService.getfeedback();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});

router.get("/getFeedback/:id", permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await feedbackService.getFeedbackByID(id);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


// get all average of all feedbacks in feedback database
router.get("/getAllAverage", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await feedbackService.getAverage();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


//  get avg of all avg
router.get("/getOverallAverage", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await feedbackService.getOverallAverage();
        res.send(new ResponseHandler(result[0]));
    }
    catch (e) {
        next(e);
    }
});

// router.get("/perFormAverage", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await feedbackService.perFormAverage();
//         res.send(new ResponseHandler(result));
//     }
//     catch (e) {
//         next(e);
//     }
// })



router.get("/filterData", permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query;
        const result = await feedbackService.filterAverage(filter);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});

export default router;