import http from "node:http";
import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000;
const mongoUrl = "mongodb://127.0.0.1:27017/Nasa";
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB ${err}`);
});

async function startServer() {
  await mongoose.connect(mongoUrl);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
}

startServer();
