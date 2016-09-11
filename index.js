const exec = require('child_process').exec;

var args = process.argv;

args.shift();
var mode = args.shift();

var wd = __dirname;

switch(mode){
	case 'client': 
		var ip = args.shift();
		var port = args.shift();
		var filepath = args.shift();
		var command = "node client.js \"" + ip + "\" " + port + " \"" + filepath + "\"";
		var opts = {
			cwd : wd
		};
		exec(command, opts, (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    return;
		  }
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
		break;
	case 'server':
		var ip = args.shift();
		var port = args.shift();
		var command = "node server.js \"" + ip + "\" " + port;
		var opts = {
			cwd : wd
		};
		exec(command, opts, (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    return;
		  }
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
		break;
	default:
		console.log("Need to specify either server or client!");
}
