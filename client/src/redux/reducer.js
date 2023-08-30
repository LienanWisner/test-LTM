import { SAVE_MESSAGES, GET_ALL_MESSAGES } from "./actions-type";

const initialState = {
    allMessages : [],
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case SAVE_MESSAGES:
            return{allMessages: [...state.allMessages, action.payload]}
        
        case GET_ALL_MESSAGES:
            return{...state, allMessages: action.payload}
            
        default:
            return state;
    }
}

export default reducer
