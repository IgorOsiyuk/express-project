import http from "node:http";
import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";
import { mongoConnect } from './services/mongo.js'
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect()

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
}

startServer();
