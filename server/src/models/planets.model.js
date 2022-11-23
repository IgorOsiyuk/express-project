import fs from "node:fs"
import { fileURLToPath } from "node:url";
import path from "node:path"
import { parse } from "csv-parse"

export const habitablePlanets = [];


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


export function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "..", "data", 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve()
            });
    })
}

export default {
    loadPlanetsData,
    habitablePlanets
}