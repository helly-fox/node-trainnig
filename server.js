import Importer from './importer';

const importer = new Importer();
const dataAsync = importer.importData('./data');
const dataSync = importer.importDataSync('./data');
console.log(dataAsync);
console.log(dataSync);