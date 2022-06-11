import { IAuth, Route } from "./routes.types";
import userRouter from '../modules/user/user.routes';
import serviceRouter from '../modules/services/service.routes';
import feedbackRouter from '../modules/feedback/feedback.routes';

// Array of Objects of Class Route
export const routes = [
    new Route('/user', userRouter),
    new Route('/services', serviceRouter),
    new Route('/feedback', feedbackRouter)
]

// Array of objects having Excluded Path Information 



export const excludedPath: IAuth[] = [
    { method: 'POST', path: '/feedback/registerFeedback' },
    { method: 'POST', path: '/user/login' },
    { method: 'GET', path: '/services/getAllServices' },
    { method: 'GET', path: '/user/getAllEmployee' }
]