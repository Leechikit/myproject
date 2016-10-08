var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

var logList = [{
    'id': 1,
    'text': '2016-08-01 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 2,
    'text': '2016-08-02 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 3,
    'text': '2016-08-03 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 4,
    'text': '2016-08-04 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 5,
    'text': '2016-08-05 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 6,
    'text': '2016-08-06 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
}, {
    'id': 7,
    'text': '2016-08-07 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3985"'
} ]

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8000, function() {
    console.log((new Date()) + ' Server is listening on port 8000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    //autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    var status = 'on';
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    /*fs.watchFile('./log.txt', function(curr, prev) {
        if (curr.mtime !== prev.mtime) {
            var text = fs.readFileSync('./log.txt', 'utf-8');
            console.log(status)
            if (status == 0) {
                connection.sendUTF(JSON.stringify({
                    'log': text
                }));
            }
        }
    })*/
    var index = 0;
    setInterval(function(){
        if(status == 0){
            connection.sendUTF(JSON.stringify({
                'log': logList[index]
            }));
            index = index + 1 >= logList.length ? 0 : index + 1; 
        }
    },100)
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            status = JSON.parse(message.utf8Data).status;
            //console.log('Received Message: ' + JSON.parse(message.utf8Data));
            //connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});