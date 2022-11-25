import { launches } from "../../models/launches.model.js"

export function getAllLaunches(req, res) {
    return res.status(200).json(Array.from(launches.values()));
}

export default {
    getAllLaunches
}