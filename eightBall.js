var net = require("net");
var port = 2001;
var fs = require("fs");


var server = net.createServer(function(client) {
	console.log("connected");
	client.setEncoding("utf8");

	client.write("\nHi I'm the magic 8 ball!\nAsk a question and I'll give you a response\nMake sure you use ? or else I might just ignore you...\n\n")

	//
	var ask = function ask() {
		fs.readFile("eightBall.json", "utf8", function(err, data) {
			if (err) {
				console.log(err);
			}
			else {
				var parsed = JSON.parse(data);
				var randQ = parsed[Math.floor(Math.random()*parsed.length - 1)]; 
				client.write(randQ + "\n");
			}
		})
	
	}
	//

	client.on("data", function(clientData) {
		var input = clientData.trim();
		if (input.indexOf("?") > -1 ){
	
			ask();
			
		}
	})



})



server.listen(port, function(){
	console.log("listening to " + port);
})