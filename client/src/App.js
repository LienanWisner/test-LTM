import "./App.css";

import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { saveMessages, getMessages } from "./redux/actions";

//socket to Backend
const socket = io("http://localhost:4000");

function App() {
  const messagesArray = useSelector((state)=>state.allMessages)
 
  const dispatch = useDispatch()
 

  const [data, setData] = useState({
    sender: "",
    content: ""
  });
  
  const [messages, setMessages] = useState([])
  const [storedMessages, setStoredMessages] = useState([])
  const [firstTime, setFirstTime] = useState(false)
  

  useEffect(() => {
    dispatch(getMessages())
  
  }, [])
  
 

  useEffect(() => {

    const receivedMessage = (message)=>{  
      setMessages([message, ...messages])
      dispatch(getMessages())
    }
    socket.on("receive-message", receivedMessage)

    return () => {
      socket.off("receive-message", receivedMessage)
    };
  }, [messages]);

  

  if(!firstTime){
    setStoredMessages(messagesArray)
    console.log(messagesArray);
    console.log(storedMessages);
    setFirstTime(true)
  }

  


  //Handlers

  //Set name
  const dataHandler = (e) => {
    setData({
      ...data, 
      [e.target.name]: e.target.value 
    })
  };

  //Set text submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    data.sender !== ""
      ? socket.emit("send-message", data.content, data.sender)
      : alert("You must enter your name to send a message");

    const newMessage = {
      content: data.content,
      sender: "Me"
    }

    setMessages([newMessage, ...messages])

    dispatch(saveMessages(data))
  };
  
 
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">CHAT</h5>

            {/* Send message */}
            <form onSubmit={handleSubmit}>
            <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  name="sender"
                  placeholder="Your name..."
                  onChange={dataHandler}
                />
              </div>
              <div className="d-flex mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  placeholder="Your message..."
                  onChange={dataHandler}
                />
                <button
                  className="btn btn-success mx-3 "
                  type="submit"
                  id="btn-message"
                >
                  Send
                </button>
              </div>
            </form>

            {/* Chat */}
            <div className="card mt-3 mb-3" id="content-chat">
              <div className="card-body">
                
                  {
                     messages.map((message,index)=>(
                      <div key={index} className={`d-flex p-3 ${message.sender === "Me"? "justify-content-end" : "justify-content-start"}`}>
                        <div className={`card mb-3 border-1 ${message.sender === "Me" ? "bg-success bg-opacity-25" : "bg-light"}`}>
                        <div className="card-body">
                          <small>{message.sender}:{message.content}</small>
                        </div>
                        </div>
                      </div>
    
                    ))
                  }

                  {/* Chat stored */}
                  <small className="text-center text-muted"> - Saved Messages -</small>
                    {messagesArray.length > 0 && messagesArray.map((message,index)=>(
                      <div key={index} className={`d-flex p-3 ${message.sender === data.sender? "justify-content-end" : "justify-content-start"}`}>
                        <div className={`card mb-3 border-1 ${message.sender === data.sender ? "bg-success bg-opacity-25" : "bg-light"}`}>
                        <div className="card-body">
                          <small className="text-muted">{message.sender}:{message.content}</small>
                        </div>
                        </div>
                      </div>
    
                    )) 
                  }

              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;