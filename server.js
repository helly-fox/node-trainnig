import Importer from './importer';
import DirWatcher from './dirWatcher';

const importer = new Importer();
const watcher = new DirWatcher();

watcher.watch('./data', 1000);
watcher.on('dirwatcher:changed', (path, files) => {
    const dataAsync = Promise.all(files.map(f => {
        importer.importData(`${path}/${f}`);
    }));
    const dataSync = files.map(f => (
        importer.importDataSync(`${path}/${f}`)
    ));
    console.log(dataSync);
    console.log(dataAsync);
});

