var io = require('socket.io')();
var fs = require('fs');
var controller = io.of('/');
var status = 0;

controller.on('connection', function(socket){
	fs.watchFile('./log.txt',function(curr,prev){
		if(curr.mtime !== prev.mtime){
			var text = fs.readFileSync('./log.txt','utf-8');
			if(status == 0){
				socket.emit('messages',text);
			}
		}
	})

	socket.on('status',function(obj){
		status = obj.status;
	})

	socket.on('disconnect', function() {
		console.log('斷開')
	});

});

exports.listen = function (server) {
    return io.listen(server);
};