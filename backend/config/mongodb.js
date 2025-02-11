import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((e) => {
        console.log("DB Connection Failed");
        console.log(e)
        process.exit(1);
    })
}

export default connectDB