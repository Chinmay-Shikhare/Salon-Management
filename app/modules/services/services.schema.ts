import { Schema, model, Document } from "mongoose";
import { IService } from "./services.types";


class serviceSchema extends Schema {
    constructor() {
        super({
            serviceName: {
                type: String,
                required: true
            }
        }, { timestamps: true })
    }
}

type servicetype = Document & IService;
const serviceDB = model<servicetype>('service', new serviceSchema());
export default serviceDB;
