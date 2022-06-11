/*  Dotenv is a zero-dependency module that loads 
environment variables from a .env file into process.env
The process.env global variable is injected by the Node 
at runtime for your application to use and it represents
the state of the system environment your application is in when it starts. */

import { config } from "dotenv";
config();

// startServer is a function that starts listening on PORT 

import { startServer } from "./app/app";
startServer();
