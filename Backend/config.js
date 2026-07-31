import dotenv from "dotenv";
dotenv.config();


// Configuration variables

//port
export const PORT = process.env.PORT || 3000;

//DB
export const mongoDBURI = process.env.MONGODB_URI;