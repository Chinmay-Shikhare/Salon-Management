import serviceDB from "./services.schema";
import { IService } from "./services.types";


const registerService = (service: IService) => serviceDB.create(service);


const getAllServices = () => serviceDB.find();

export default {
    registerService,
    getAllServices
}