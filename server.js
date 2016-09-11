var net = require('net');
var fs = require('fs');
var buffer = require('buffer');

var sm = require('libs/lib.js');

var FILEPATH = __dirname + "\\";
var EXITCONDITION = false;

var ip = process.argv[2];
var port = process.argv[3];

sm.create("Test", port, ip)
.then(function(_s){
	console.log("Server is up!");
	
	_s._server.on('connection',function(conn) {
		var phase = 0;
		var filename;
		console.log('connection made...\n');
		conn.on("data", function(data){
			if(!phase){
				filename = data;
				phase++;
			}
			else{
				var fileStream = fs.createWriteStream(FILEPATH + "R" + filename );
				var stream = conn.pipe(fileStream);
			    stream.on("finish",function(){
			    	phase = 0;
			    	console.log("File saved!");
			    });
			}
		});
	});
});