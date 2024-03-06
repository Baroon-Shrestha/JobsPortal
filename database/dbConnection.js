import mongoose from "mongoose";

const dbName = "Jobs_portal"
export const dbConnection = (() => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: dbName
    })
        .then(() => {
            console.log("connection successful");
        }).catch((err) => {
            console.log(`error : ${err}`);
        })
})
