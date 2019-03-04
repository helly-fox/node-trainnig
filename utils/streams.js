const program = require('commander');
const {
    inputOutput,
    transformFile,
    transformFileToJson,
    transform,
    bundleCSS,
    errorMessage,
    printHelpMessage,
} = require('./utils');

function argToFunction(functionName) {
    switch (functionName) {
        case 'transform':
            return transform;
        case 'io':
            return inputOutput;
        case 'transform-file':
            return transformFile;
        case 'to-json':
            return transformFileToJson;
        case 'bundle':
            return bundleCSS;
        default:
            return errorMessage;
    }
}

function runCommand({action, file}) {
    if ((action === 'io' || action === 'transform-file') && !file) {
        console.error('file is required for this actions');
    }
    argToFunction(action)(file);
}

program
    .option('-a, --action [functionName]', 'Name of the called function')
    .option('-f, --file [file]', 'File name passed to action function')
    .on('--help', printHelpMessage)
    .on('-h', printHelpMessage)
    .parse(process.argv);

runCommand({action: program.action, file: program.file});

module.exports = runCommand;


