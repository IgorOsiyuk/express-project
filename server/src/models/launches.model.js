import launches from "./launches.mongo.js";
import planets from "./planets.mongo.js";

// export const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

export function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

export async function getAllLaunches() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

export async function sheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    success: true,
    customer: ["Zero TM", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}
// export function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(latestFlightNumber, {
//     ...launch,
//     upcoming: true,
//     success: true,
//     customer: ["Zero TM", "NASA"],
//     flightNumber: latestFlightNumber,
//   });
// }

export function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

export default {
  existsLaunchWithId,
  getAllLaunches,
  sheduleNewLaunch,
  abortLaunchById,
};
