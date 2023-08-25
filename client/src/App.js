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
  // const messagesArray = dispatch(getMessages())

  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  // const [messages, setMessages]= useState([])

  //tendria que ser global state?
  // const [storedMessages, setStoreMessages] = useState([])
  // const [firstTime, setFirstTime] = useState(false)


  useEffect(() => {
    dispatch(getMessages())
    // const receivedMsg = (message)=>{
    //   dispatch(saveMessages(message))
      
    // }
    
    socket.on("message", "aaa")

    return () => {
      socket.off("message", "aaa")
    };
  }, []);


  //Handlers

  //Set name
  const senderHandler = (e) => {
    setSender(e.target.value);
  };

  //Set name submit
  const senderSubmit = (e) => {
    e.preventDefault();
    setSender(sender);
    setDisabled(true);
  };

  //Set text
  const contentHandler = (e)=>{
    setContent(e.target.value);
  }
  //Set text submit
  const handleSubmit = (e) => {
    e.preventDefault();
    sender !== ""
      ? socket.emit("message", content, sender)
      : alert("You must enter your name to send a message");

    const newMessage = {
      content: content,
      // sender: sender
      sender: "Me"
    }
    dispatch(saveMessages(newMessage))
    console.log("Estado actualizado después de guardar el mensaje:", messagesArray);
    setContent("")
    // setMessages([newMessage, ...messages])
    
  };

  
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">CHAT</h5>

            {/* Name */}
            <form onSubmit={senderSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  name=""
                  id="name"
                  placeholder="Your name..."
                  onChange={senderHandler}
                />
                <button
                  className="btn btn-success mx-3 "
                  type="submit"
                  id="btn-name"
                >
                  Set
                </button>
              </div>
            </form>

            {/* Send message */}
            <form onSubmit={handleSubmit}>
              <div className="d-flex mt-3">
                <input
                  type="text"
                  className="form-control"
                  name=""
                  id="message"
                  placeholder="Your message..."
                  onChange={contentHandler}
                  value={content}
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
                {/* <div>
                  {messagesArray.map(message => (
                    <small>{message.sender}:{message.content}</small>
                  ))}
                  </div> */}

                  
                
                  {messagesArray.length > 0 ? (
                    messagesArray.map((message,index)=>(
                      <div key={index} className={`d-flex p-3 ${message.sender === "Me"? "justify-content-end" : "justify-content-start"}`}>
                        <div className={`card mb-3 border-1 ${message.sender === "Me" ? "bg-success bg-opacity-25" : "bg-light"}`}>
                        <div className="card-body">
                          <small>{message.sender}:{message.content}</small>
                        </div>
                        </div>
                      </div>
    
                    ))
                  ) : (
                    console.log("Valor de messagesArray:", messagesArray)
                  )}
                  
                

              </div>
            </div>

            {/* Chat stored */}
                {/* {messagesArray.map((message, index)=>{
                  <div key={index} className={`d-flex p-3 ${message.sender === "Me"? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 border-1 ${message.sender === "Me" ? "bg-success bg-opacity-25" : "bg-light"}`}>
                    <div className="card-body">
                      <small>{message.sender}:{message.content}</small>
                    </div>
                    </div>
                  </div>

                })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
