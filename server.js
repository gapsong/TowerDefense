//hier befindet sich die server datei
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var p2 = require('p2');
var serverlogic = require('./js/server/serverlogic');


app.use('/js/client', express.static(__dirname + '/js/client'));
app.use('/assets', express.static(__dirname + '/assets'));


serverlogic.logic();//Serverlogik diese Methode startet die Logik

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//Make local files accessible to html get requests

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
});
