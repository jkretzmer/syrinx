export const updateGraphData = (data) => ({
	type: "UPDATE_GRAPH_DATA",
	msg: data
})

export const bufferSBPData = (data) => ({
	type: "BUFFER_SBP_DATA",
	msg: data
})

/* Used only by actions for sockets */
export const initialData = (res) => ({
	type: "INITIAL_DATA",
	items: res
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const startSBPStream = (socket) => {
	return (dispatch) => {
		socket.on('connected',(res)=>{
		   	socket.emit('init');
		   	dispatch(initialData(res));
	   });
	}	
}