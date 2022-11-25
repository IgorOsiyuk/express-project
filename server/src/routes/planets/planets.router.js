import express from "express";
import { httpGetAllPlanets } from "./planets.controller.js"

const planetRouter = express.Router();

planetRouter.get("/planets", httpGetAllPlanets);

export default planetRouter