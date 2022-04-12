import React, { useEffect, useRef, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {authActions}  from '../../../store/AuthSlice'
import { axiosInstance } from "../../../network/axiosConfig";
import { FiSend } from "react-icons/fi";
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
  const messagesEndRef = useRef(null);
  const dispatch =  useDispatch()
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  useEffect(() => {
    sendRequest(
      {
        url: `${loggedAs}/chat/getChat/${orderId}/${buyerId}/${sellerId}`,
        method: "GET",
      },
      (res) => {
        setChat(res.data.messages);
        setUpdatedAt(new Date(res.data.updatedAt));
      }
    );
    sendRequest({
      url:`${loggedAs}/chat/setMessgeAsReaded`,
      method:'PATCH',
      body:{orderId}
    },(res)=>{
      console.log(res.data);
      dispatch(authActions.setNotification(res.data))
    })
  }, []);
  useEffect(() => {
    socket?.on("receiveMessage", (messages) => {
      setChat(messages);
    });
  }, [socket, chat]);
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
            {updatedAt ? (
              <span>
                {updatedAt.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            ) : (
              <h3>let`s chat now</h3>
            )}
          </div>
          <div className="chat" data-chat="person2">
            {chat.map((message) => (
              <div
              ref={messagesEndRef}
                key={message._id}
                className={`bubble ${message.from === "buyer" ? "you" : "me"}`}
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
              className={`${message ? "" : "disabled-link"}`}
              onClick={sendMessage}
            >
              <FiSend className="fs-3" />
            </Link>
           
          </div>
        </div>
      )}
    </>
  );
}
