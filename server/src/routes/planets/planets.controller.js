import { getAllPanets } from "../../models/planets.model.js";

export async function httpGetAllPlanets(req, res) {
  const planets = await getAllPanets();
  return res.status(200).json(planets);
}

export default {
  httpGetAllPlanets,
};
