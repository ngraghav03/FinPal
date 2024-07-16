// import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import User from "./userSchema.js";
import env from "dotenv";
env.config();
let client;

async function connectionToDb(cb) {
    try {
        client = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        // dbConnection = await client.db("finpal");
        return cb();
    } catch(err) {
        // console.log(err)
        return cb(err);
    }
}

function gettingDB() {
    return client;
}



export {connectionToDb, gettingDB };