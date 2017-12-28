/**
 * Source based on https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
 */
process.env.PORT = process.env.PORT || 8888;
var http = require('http');
var fs = require('fs');
var path = require('path');

function addCORSHeaders(response) {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
}

function readFileCallback(error, content, contentType, response) {
    if (error) {
        if(error.code == 'ENOENT'){
            console.log('Responding with 404');
            response.writeHead(404);
            response.end('404: File not found' + ' ..\n');
        }
        else {
            console.log('Responding with 500');
            response.writeHead(500);
            response.end('500: Server file read error: ' + error.code + ' ..\n');
        }
    }
    else {
        console.log('Responding with 200');
        response.setHeader('Content-Type', contentType);
        addCORSHeaders(response);
        response.writeHead(200);
        response.end(content, 'utf-8');
    }
}

function createServerCallback(request, response) {
    console.log(new Date().toLocaleString(), 'Incoming request for:', request.url);
    var filePath = './public' + request.url;
    if (filePath === './public/')
        filePath += 'index.html';
    if (filePath === './public/require.js')
        filePath = './node_modules/requirejs/require.js';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    fs.readFile(filePath, function(error, content) {
        readFileCallback(error, content, contentType, response);
    });

}

console.log('Starting server...');
http.createServer(createServerCallback).listen(process.env.PORT);
console.log('Server running at http://127.0.0.1:' + process.env.PORT);