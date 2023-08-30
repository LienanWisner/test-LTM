import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveMessages, getMessages } from "./redux/actions";

//socket to Backend
const socket = io("http://localhost:4000");

function App() {

  const messagesArray = useSelector((state) => state.allMessages);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    sender: "",
    content: "",
  });

  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    dispatch(getMessages());

  }, [])

  useEffect(() => {
    dispatch(getMessages());
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

  //Send text submit
  const handleSubmit = (e) => {
    e.preventDefault();

    data.sender !== ""
      ? socket.emit("send-message", data.content, data.sender)
      : alert("You must enter your name to send a message");

    const newMessage = {
      content: data.content,
      sender: "Me",
    };

    setMessages([newMessage, ...messages]);

    dispatch(saveMessages(data));
    // dispatch(getMessages());
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
              {/* Message */}
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

        {/* Chat */}
        <div className="card mt-3 mb-3" id="content-chat">
          <div className="card-body">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex p-3 ${
                    message.sender === "Me"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`card mb-3 border-2 rounded-5 ${
                      message.sender === "Me"
                        ? "bg-primary bg-opacity-50"
                        : "bg-light bg-opacity-75"
                    }`}
                  >
                    <div className="card-body">
                      <small>
                        {message.sender} : {message.content}
                      </small>
                    </div>
                  </div>
                </div>
              ))}

            {/* Chat DB */}
            <small className="text-center text-muted">
              {" "}
              - Previous Messages -
            </small>

            {messagesArray.length > 0 &&
              messagesArray.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex p-3 ${
                    message.sender === data.sender
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`card mb-3 border-2 rounded-5  ${
                      message.sender === data.sender
                        ? "bg-primary bg-opacity-25"
                        : "bg-light bg-opacity-25"
                    }`}
                  >
                    <div className="card-body">
                      <small className="text-muted">
                        {message.sender} : {message.content}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
