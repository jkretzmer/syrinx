export const updateGraphData = (data) => ({
	type: "UPDATE_GRAPH_DATA",
	msg: data
})

export const bufferSBPData = (data) => ({
	type: "BUFFER_SBP_DATA",
	msg: data
})

/* Used only by actions for sockets */
export const initialData = () => ({
	type: "INITIAL_DATA"
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const startSBPStream = (socket) => {
	return (dispatch) => {
    socket.onopen = () => {
        console.log("connection opened");
        socket.send("SBP_JSON_REQ");
        dispatch(initialData())
    }
	}
}
