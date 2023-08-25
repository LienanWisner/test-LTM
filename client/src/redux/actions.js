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
  
        return data; // Puedes retornar los datos si es necesario en el componente
      } catch (error) {
        console.log("Action error: getMessages", error);
        // Puedes disparar una acción para manejar el error en el estado si es necesario
      }
    };
  };

// export const getMessages = ()=>{
//     return async(dispatch) => {
//         try{
//             return fetch(endpoint)
//             .then(response=>response.json())
//             .then((data) => 
//             console.log(data) &&
//             dispatch({
//                type: GET_ALL_MESSAGES,
//                payload: data,
//             }));
//         }
//         catch(error){
//             console.log("Action error: getMessages")
//             // console.log(error.response.data.message)}
//         }
//     };
//     };

// export const getMessages = ()=>{
//     return async(dispatch)=>{
//         try{
//             const {data} = await axios.get(endpoint)
            
//             return dispatch({
//                 type:GET_ALL_MESSAGES,
//                 payload: data
//             })
//         } catch(error){
//             console.log("Action error: getMessages")
//             // console.log(error.response.data.message)}
//         }
//     }
// }