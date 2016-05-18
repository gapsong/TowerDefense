//hier befindet sich die server datei
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Make local files accessible to html get requests

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
});
