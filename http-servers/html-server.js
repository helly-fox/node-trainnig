const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'html'
    });
    /** Commented code below is a part of previous subtask **/
    // const data = fs.readFileSync(path.resolve('http-servers/index.html'));
    // res.end(data);

    fs.end(path.resolve('http-servers/index.html')).pipe(res);
}).listen(3001);