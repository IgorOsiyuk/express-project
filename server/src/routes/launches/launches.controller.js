import {
    getAllLaunches,
    addNewLaunch,
} from "../../models/launches.model.js"

export function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

export function httpAddNewLaunch(req, res) {
    const launch = req.body
    launch.launchDate = new Date(launch.launchDate)

    addNewLaunch(launch);
    return res.status(201).json(launch)
}

export default {
    httpGetAllLaunches,
    httpAddNewLaunch
}