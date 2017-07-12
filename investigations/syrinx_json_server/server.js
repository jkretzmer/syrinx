var spawn = require("child_process").spawn,
	connect = require("connect"),
	app = connect().use(connect.static("syrinx_json_server")).listen(3000);
	io = require("socket.io").listen(app);

io.set('transports', [ 'websocket' ]);

io.sockets.on("connection", function(socket){
	console.log('connection opened');
	socket.emit('connected');

	socket.on("init", function(data){
		console.log('sbp_json initiated')
		sbp_json = spawn('sh', [ 'sbp_json.sh' ]);
		sbp_json.stdout.on("data", function(data){
			data.toString().split("\n").forEach(function (msg){
        		if (msg.length > 0){
					socket.emit("data", msg);
				}
			})
		});		
	});

	socket.on("disconnect", function(){
		console.log("closing connection");
		if(sbp_json === undefined){
			sbp_json.kill('SIGHUP');
		}
	});
});

console.log('Syrinx JSON Server running at port 3000');

