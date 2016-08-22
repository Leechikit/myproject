/*var socket = io('http://172.19.43.116:8000');
socket.on('messages',function(obj){
	console.log(obj)
	$('.log-content').append('<div class="log-item">'+obj+'</div>')
})
$('.btn-start').on('click', function(event) {
	event.preventDefault();
	socket.emit('status',{'status':0});
});
$('.btn-pause').on('click', function(event) {
	event.preventDefault();
	socket.emit('status',{'status':1});
});*/
$('.btn-search').on('click', function(event) {
	event.preventDefault();
	var text = $('.search-text').val();
	if(text.trim()){
		search(text);
	}
});
function search(keyword){
	var textArrs = []; 
	$('.log-content .log-item').each(function(index, el) {
		var text = $(el).text();
		var rtext = text.replace(keyword,'<span class="u">'+keyword+'</span>');
		var rdom = $('<div>').addClass('log-item').append(rtext);
		textArrs.push(rdom);
	});
	$('.log-content').empty().append(textArrs)
}
var client = new WebSocket('ws://192.168.31.175:8000', 'echo-protocol');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    /*function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();*/
    /*if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({'status':0}))
    }*/
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
	console.log(e)
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
		$('.log-content').append('<div class="log-item">'+e.data+'</div>')
    }
};
$('.btn-start').on('click', function(event) {
	event.preventDefault();
	client.send(JSON.stringify({'status':0}))
});
$('.btn-pause').on('click', function(event) {
	event.preventDefault();
	client.send(JSON.stringify({'status':1}))
});