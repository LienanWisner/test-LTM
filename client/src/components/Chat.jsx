import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getMessages } from "../redux/actions";

const Chat =({messages, data})=>{

  const dispatch = useDispatch()
  //Getting global state
  const messagesArray = useSelector((state) => state.allMessages);

  //Reversing and slicing global state
  const previousMessages = [...messagesArray].reverse().slice(0, 50);

  useEffect(() => {
    dispatch(getMessages())

  }, [])
  

    return(
        <>
        {/* Render new messages */}
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

            {/* Render Previous messages */}
            <small className="text-center text-muted">
              - Previous Messages -
            </small>

            {previousMessages.map((message, index) => (
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
                ))
                }
          </div>
        </div>
        </>
    )
}

export default Chat