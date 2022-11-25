export const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    destination: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

export function getAllLaunches() {
    return Array.from(launches.values())
}

export function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, {
        ...launch,
        upcoming: true,
        success: true,
        customer: ["Zero TM", "NASA"],
        flightNumber: latestFlightNumber
    })
}

export default {
    getAllLaunches,
    addNewLaunch
}