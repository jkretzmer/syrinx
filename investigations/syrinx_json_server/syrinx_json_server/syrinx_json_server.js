(function(){
	var socket = io.connect("http://localhost:3000", { transports: ['websocket']});
		body = document.body;

	socket.emit("init");

	socket.on("data", function(data){
		sbp_data = data.split("\n");
		sbp_data.forEach(function(msg){
			
			if (msg.length > 0){
				sbp_msg = JSON.parse(msg);
				
				if (sbp_msg.msg_type == 2305){
					var pre = document.createElement("pre"),i;
					pre.innerHTML = msg;

					if(body.childNodes.length >0){
						body.insertBefore(pre, body.firstChild);
					}
					else{
						body.appendChild(pre);
					}
					if(body.childNodes.length > 100){
						for (i = 0; i< 50; i += 1){
							body.removeChild(body.childNodes[body.childNodes.length]);
						}
					}
				}
			}
		})
	});
}());