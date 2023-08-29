import { SAVE_MESSAGES, GET_ALL_MESSAGES } from "./actions-type";
import axios from "axios";

const endpoint = "http://localhost:4000/messages"

export const saveMessages = (params)=>{
    return async (dispatch) =>{
        try{
            const {data} = await axios.post(endpoint, params)
            // console.log(data);
            return dispatch({
                type: SAVE_MESSAGES,
                payload: data
            })
        } catch(error){
            // console.log("Action error: saveMessages")
            console.log(error.response)
        }
    }
}

export const getMessages = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
  
        dispatch({
          type: GET_ALL_MESSAGES,
          payload: data,
        });
      } catch (error) {
        console.log("Action error: getMessages", error);
      }
    };
  };