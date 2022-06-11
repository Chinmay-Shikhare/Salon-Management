import { Schema, model, Document } from "mongoose";


class roleSchema extends Schema {

}


type roleType = Document;
const rolesDB = model<roleType>('role', new roleSchema());
export default rolesDB;

