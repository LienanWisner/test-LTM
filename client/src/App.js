import "./App.css";

import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { saveMessages, getMessages } from "./redux/actions";

//socket to Backend
const socket = io("http://localhost:4000");

function App() {
  // const getMessages = useSelector((state)=>state.allMessages)
  const dispatch = useDispatch()

  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages]= useState([])

  //Se puede hacer el siguiente useEffect pero usando un estado global
  useEffect(() => {
    const receivedMsg = (message)=>{
      setMessages([message, ...messages])
    }
    
    socket.on("message", receivedMsg)

    return () => {
      socket.off("message", receivedMsg)
    };
  }, [messages]);

  const senderHandler = (e) => {
    setSender(e.target.value);
  };

  const contentHandler = (e)=>{
    setContent(e.target.value);
  }

  const senderSubmit = (e) => {
    e.preventDefault();
    setSender(sender);
    setDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sender !== ""
      ? socket.emit("message", content, sender)
      : alert("You must enter your sender to send a message");

    const newMessage = {
      content: content,
      sender: sender
    }

    setMessages([newMessage, ...messages])
    setContent("")
    dispatch(saveMessages(newMessage))
    
  };

  //Con useEffect tengo que hacer un dispatch a la action para traer los mensajes del estado global
  //Ojo si hay que mapear

  // useEffect(() => {
  //   // Effect function
    
  //   return () => {
  //     // Cleanup function
  //   };
  // }, [/* dependencies array */]);

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
                  Set
                </button>
              </div>
            </form>

            {/* Chat */}
            <div className="card mt-3 mb-3" id="content-chat">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
