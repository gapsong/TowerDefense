//hier befindet sich die server datei
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var p2 = require('p2');
var serverlogic = require('./js/server/serverlogic');


app.use('/js/client', express.static(__dirname + '/js/client'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

serverlogic.logic(io);//Serverlogik diese Methode startet die Logik. Hiermit übergebe ich "io" als parameter
//Socket io
http.listen(3000, function () {
  console.log('listening on *:3000');
});

/*
//Make local files accessible to html get requests
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
});
*/
