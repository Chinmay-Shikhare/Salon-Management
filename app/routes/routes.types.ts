import { Router } from "express";

export class Route{
    constructor(
        public path: string,
        public router: Router
    ){}
}
export interface IAuth {
    path: string
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"
}
