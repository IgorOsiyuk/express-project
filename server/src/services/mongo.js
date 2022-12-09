import mongoose from "mongoose";

const mongoUrl = "mongodb://127.0.0.1:27017/Nasa";

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB ${err}`);
});

export async function mongoConnect() {
    await mongoose.connect(mongoUrl);
}

export async function mongoDisconnect() {
    await mongoose.disconnect();
}

export default { mongoConnect, mongoDisconnect }
