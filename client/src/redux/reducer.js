import { SAVE_MESSAGES, GET_ALL_MESSAGES } from "./actions-type";

const initialState = {
    allMessages : [],
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case SAVE_MESSAGES:
            // console.log(action.payload);
            // return{...state}
            return{...state, allMessages: action.payload}
        
        case GET_ALL_MESSAGES:
            return{...state, allMessages: action.payload}

        default:
            return state;
    }
}

export default reducer
