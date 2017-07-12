let id = 0;
const initialState = {sbp_data:[], graph_data: [{}]};
const maxSBPBufferSize = 250;

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INITIAL_DATA':
    return {
        ...state
      }

    case 'BUFFER_SBP_DATA':
        if (state.sbp_data.length >= maxSBPBufferSize)
        {
          return {
              ...state,
              sbp_data: [...state.sbp_data.slice(1),
                        action.msg]
          }
        }
        else{
          return {
              ...state,
              sbp_data: [...state.sbp_data, action.msg]
          }
        }

    case 'UPDATE_GRAPH_DATA':
        return {
            ...state,
            graph_data: [action.msg]
        }
        
    default:
      return state
  }
}

export default reducer