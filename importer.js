import fs from 'fs';
import csvjson from 'csvjson';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export default class Importer {
    importDataSync(path) {
        try {
            console.log(path)
            return csvjson.toObject(fs.readFileSync(path, {encoding: 'utf8'}));
        } catch (e) {
            throw e;
        }
    }

    importData(path) {
        return readFileAsync(path, {encoding: 'utf8'})
            .then(csvjson.toObject)
            // .then(console.log)
            .catch(console.error)
    }
}