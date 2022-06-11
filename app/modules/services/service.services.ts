import servicesRepo from "./services.repo";
import { IService } from "./services.types";


const registerService = (service: IService) => servicesRepo.registerService(service);

const getAllServices = () => servicesRepo.getAllServices();


export default {
    registerService,
    getAllServices
}