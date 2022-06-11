import { Schema, model, Document } from "mongoose";
import { IFeedback } from "./feedback.types";

class feedbackSchema extends Schema {
    constructor() {
        super({
            customerName: {
                type: String,
                required: true
            },
            customerAge: {
                type: String,
                required: true
            },
            customerEmail: {
                type: String,
                required: true
            },
            serviceBy: {
                type: Schema.Types.ObjectId,
                ref: 'user' // employee id
            },
            servicedAvailed: [{
                type: Schema.Types.ObjectId,
                ref: 'service' // employee id
            }],
            ambienceRating: {
                type: Number
            },
            cleanlinessRating: {
                type: Number
            },
            ServiceRating: {
                type: Number
            },
            OverallExpereinceRating: {
                type: Number
            },
            comments: {
                type: String
            }
        }, { timestamps: true })
    }
}


type feedbackType = Document & IFeedback;
const feedbackDB = model<feedbackType>('feedback', new feedbackSchema());
export default feedbackDB;