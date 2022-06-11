import feedbackRepo from "./feedback.repo";
import { IFeedback } from "./feedback.types";
import { sendMail } from "../../utility/sendMail";


const registerFeedback = async (feedback: IFeedback) => {
    const data = await feedbackRepo.registerFeedback(feedback);
    // console.log(typeof data._id.toString())
    const getOverallAverage: any = await feedbackRepo.perFormAverage(data._id.toString());
    // console.log(` avg rating ${getOverallAverage[0].avgRating}`);
    await sendMail(getOverallAverage[0].avgRating, data.customerEmail);
    return data;
}

const getfeedback = () => feedbackRepo.getfeedback();

const getFeedbackByID = (id: string) => feedbackRepo.getFeedbackByID(id);

const getAverage = () => feedbackRepo.getAverage();

const getOverallAverage = () => feedbackRepo.getOverallAverage();

const filterAverage = (filter: any) => feedbackRepo.filterAverage(filter);

export default {
    registerFeedback,
    getfeedback,
    getAverage,
    getOverallAverage,
    getFeedbackByID,
    filterAverage
} 