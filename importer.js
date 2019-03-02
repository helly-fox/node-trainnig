import DirWatcher from './dirWatcher';
import fs from 'fs';
import csvjson from 'csvjson';
import {promisify} from 'util';

const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

export default class Importer {
    constructor() {
        this.watcher = new DirWatcher();
        this.importedData = {};
        this.watcher.on('dirwatcher:changed', this.importFn);
    }

    importFn(path, files) {
        const readFileAsync = promisify(fs.readFile);
        return Promise.all(
            files.map(f =>
                readFileAsync(`${path}/${f}`, {encoding: 'utf8'})
            )
        ).then(data => {
            let result = {};
            data.forEach((d, i) => {
                result[files[i]] = csvjson.toObject(d);
            });
            this.importedData[path] = result;
        })
    }

    importDataSync(path) {
        if (this.importedData[path]) {
            return this.importedData[path];
        }

        try {
            const files = fs.readdirSync(path);
            this.importedData[path] = files
                .map(f => fs.readFileSync(`${path}/${f}`, {encoding: 'utf8'}))
                .map(d => csvjson.toObject(d));
            return this.importedData[path];
        } catch (e) {
            throw e;
        }
    }

    importData(path) {
        return this.importedData[path] ?
            Promise.resolve(this.importedData[path]) :
            readDirAsync(path)
                .then((files = []) => Promise.all(
                    files.map(f =>
                        readFileAsync(`${path}/${f}`, {encoding: 'utf8'})
                    ))
                )
                .then(data => {
                    this.importedData[path] = data.map((d, i) => csvjson.toObject(d));
                    return this.importedData[path];
                })
    }
}