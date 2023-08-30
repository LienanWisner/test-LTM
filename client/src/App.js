import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import { saveMessages} from "./redux/actions";
import Chat from "./components/Chat";

//socket to Backend
const socket = io("http://localhost:4000");

function App() {
 
  const dispatch = useDispatch();

  //Local states
  const [data, setData] = useState({
    sender: "",
    content: "",
  });

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("receive-message", receivedMessage);

    return () => {
      socket.off("receive-message", receivedMessage);
    };
  }, [messages]);

  //Handlers

  //Sender & content handler
  const dataHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //Send text handler
  const handleSubmit = (e) => {
    e.preventDefault();

    //emit socket
    data.sender !== ""
      ? socket.emit("send-message", data.content, data.sender)
      : alert("You must enter your name to send a message");

    const newMessage = {
      content: data.content,
      sender: "Me",
    };
    
    setMessages([newMessage, ...messages]);

  
    //sending message to DB
    dispatch(saveMessages(data));
  };

  return (
    <div className="App ">
      <div className="container   mt-3 ">
        <div
          className="card w-50 align-items-center justify-content-center mx-auto"
          id="data-card"
        >
          <div className="card-body">
            <h5 className="text-center">LTM CHAT</h5>

            {/* Name */}
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
              {/* Content */}
              <div className="d-flex mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  placeholder="Your message..."
                  onChange={dataHandler}
                />
                <button
                  className="btn btn-primary btn-opacity-25 mx-3 "
                  type="submit"
                  id="btn-message"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        <Chat messages = {messages} data={data}/>

      </div>
    </div>
  );
}

export default App;
