var express = require('express'),
	http = require('http'),
    path = require('path'),
	config = require('./core/config');
	
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('io', io);
config.config(app);

server.listen(3030);