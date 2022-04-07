import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { axiosInstance } from "../../../network/axiosConfig";
import Empty from "../emptyData/Empty";
import "./chat.scss";
export default function Chat(props) {
  const { sendRequest, hasError } = useFetch();
  const loggedAs = useSelector((state) => state.auth.userType);
  const orderId = useSelector((state) => state.order.orderId);
  const sellerId = useSelector((state) => state.order.sellerId);
  const buyerId = useSelector((state) => state.order.buyerId);

  const socket = props.socket;
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [updatedAt, setUpdatedAt] = useState();
  useEffect(() => {
    sendRequest(
      {
        url: `${loggedAs}/chat/getChat/${orderId}/${buyerId}/${sellerId}`,
        method: "GET",
      },
      (res) => {
        console.log(res);
        setChat(res.data.messages);
        setUpdatedAt(new Date(res.data.updatedAt));
      }
    );
  }, []);
  useEffect(() => {
      console.log('socket');
    socket?.on("receiveMessage", (data) => {
        console.log(data);
        // setChat(data)
    //   socket.off("receiveMessage");
    });
  }, [socket]);
  const sendMessage = () => {
    axiosInstance.post(`${loggedAs}/chat/sendMessage`, {
      message,
      orderId,
      buyerId,
      sellerId,
    });
    setMessage("");
  };
  return (
    <>
      {!hasError && (
        <div className="right">
          <div className="top text-center mb-4">
            {updatedAt && (
              <span>
                {updatedAt.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
          <div className="chat" data-chat="person2">
            {chat.map((message) => (
              <div
                key={message._id}
                className={`bubble ${message.from ==='seller' ? "you" : "me"}`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="write">
            <input
              value={message}
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Link
              to=""
              className={`write-link send ${message ? "" : "disabled-link"}`}
              onClick={sendMessage}
            ></Link>
          </div>
        </div>
      )}
    </>
  );
}
