const fs = require('fs');
const through = require('through2');
const csvjson = require('csvjson');
var https = require('https');

function inputOutput(filePath) {
    const reader = fs.createReadStream(filePath);
    reader.pipe(process.stdout);
}

function transformFile(filePath) {
    const reader = fs.createReadStream(filePath);

    reader
        .pipe(through({objectMode: true, allowHalfOpen: false}, function (chunk, enc, cb) {
            this.push(JSON.stringify(csvjson.toObject(chunk.toString())));
            cb();
        }))
        .pipe(process.stdout);
}

function transformFileToJson(filePath) {
    const writePath = filePath.replace('.csv', '.json');
    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(writePath);

    reader
        .pipe(through({objectMode: true, allowHalfOpen: false}, function (chunk, enc, cb) {
            this.push(JSON.stringify(csvjson.toObject(chunk.toString())));
            cb();
        }))
        .pipe(writer);
}

function transform() {
    const transformToUpperCase = function (buffer, encoding, next) {
        this.push(buffer.toString().toUpperCase());
        next();
    };

    process.stdin.pipe(through(transformToUpperCase)).pipe(process.stdout);
}

function bundleCSS(path) {
    const outputPath = './bundle.css';
    const url = "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css";
    const writer = fs.createWriteStream(outputPath);
    fs.readdir(path, { withFileTypes: '.css' }, (err, files) => {
        files.forEach(f => {
            const reader = fs.createReadStream(`${path}/${f.name}`);
            reader.pipe(writer);
        });
        https.get(url, res => {
            res.pipe(fs.createWriteStream(outputPath, {flags: 'a'}));
        });
    });
}

function errorMessage() {
    console.log('There is no required params. See the help:');
    printHelpMessage()
}

function printHelpMessage() {
    console.log('Params options: ');
    console.log('-a, --action [functionName]', 'Name of the called function');
    console.log('-f, --file [file]', 'File name passed to action function');
}

module.exports = {
    inputOutput,
    transformFile,
    transformFileToJson,
    transform,
    bundleCSS,
    errorMessage,
    printHelpMessage
}