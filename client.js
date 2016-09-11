var net = require('net');
var fs = require('fs');

var sm = require('./node_modules/server-manager');

var PORT = process.argv[3];
var HOST = process.argv[2];
var FILEPATH = process.argv[4];
var temp = FILEPATH.split("\\");
var filename = temp[temp.length-1];

sm = sm.TCP;
sm.createClient("Test", PORT, HOST)
.then(function (r) {
  r._socket.write(filename,function(){
		r.sendFile(FILEPATH);
  });
  
});