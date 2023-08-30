import { SAVE_MESSAGES, GET_ALL_MESSAGES } from "./actions-type";
import axios from "axios";

const endpoint = "http://localhost:4000/messages"

export const saveMessages = (params)=>{
    return async (dispatch) =>{
        try{
            const {data} = await axios.post(endpoint, params)
            
            return dispatch({
                type: SAVE_MESSAGES,
                payload: data
            })
        } catch(error){
            console.log("Action error: saveMessages", error)
        }
    }
}

export const getMessages = () => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(endpoint)
        dispatch({
          type: GET_ALL_MESSAGES,
          payload: data,
        });
      } catch (error) {
        console.log("Action error: getMessages", error);
      }
    };
  };