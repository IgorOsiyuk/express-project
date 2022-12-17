import http from "node:http";
import * as dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";
import { loadLaunchData } from "./models/launches.model.js";
import { mongoConnect } from "./services/mongo.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
}

startServer();
