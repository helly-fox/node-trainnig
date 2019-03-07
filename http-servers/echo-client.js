const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3004,
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
    }
};

const req = http.request(options, function(res) {
    res.pipe(process.stdout);
});

process.stdin.pipe(req);
