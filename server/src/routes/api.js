import express from "express";
import planetRouter from "./planets/planets.router.js";
import launchesRouter from "./launches/launches.router.js";

const api = express.Router();

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

export default api;
