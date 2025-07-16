import React, { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchAllEmployees, getLoggedInEmployee } from "../service/service";
import socket from "../utils/socket";
import { useParams } from "react-router";
import { current } from "@reduxjs/toolkit";

const MessagesEmpVsMan = () => {
  const [messages, setMessages] = useState([]);
  const [managerId, setManagerId] = useState("");
  const [input, setInput] = useState("");
  const { id: receiveIdFromURL } = useParams();

  const { employeeInfo, loggedEmployee } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const managers = employeeInfo?.filter((u) => u.position === "manager");

  const senderId = loggedEmployee?._id;
  const isEmployee = loggedEmployee?.position === "employee";
  const receiverId = isEmployee ? managerId : receiveIdFromURL;

  const chatId = receiverId ? [senderId, receiverId].sort().join("_") : "";

  useEffect(() => {
    if (chatId) {
      socket.emit("joinRoom", chatId);
    }

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [chatId]);

  const handleSend = () => {
    if (input.trim() === "") return;
    console.log("Sending:", { input, chatId, senderId, receiverId });

    socket.emit("sendMessage", {
      chatId,
      senderId,
      receiverId,
      text: input,
    });
  };

  console.log(messages)
  useEffect(() => {
    if (token) {
      dispatch(getLoggedInEmployee(decode.id));
      dispatch(fetchAllEmployees());
    }
  }, []);
  if (!loggedEmployee) return <p>Loading employee data...</p>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-teal-400 to-green-400 relative overflow-x-hidden py-5 px-10">
      <div>
        { loggedEmployee?.position === "employee" && (
          <select
            className="mb-4 "
            onChange={(e) => setManagerId(e.target.value)}
            value={managerId}
          >
            <option value="">Select Manager</option>
            {managers?.length > 0  ? managers?.map((mgr) => (
              <option key={mgr._id} value={mgr._id}>
                {mgr.firstname + " " + mgr.lastname}
              </option>
            )) : <option disabled>No Managers Found</option>}
          </select>
        )}
      </div>

      <div>
        <div className="h-[90vh] w-full max-w-lg mx-auto flex flex-col shadow-2xl rounded-xl bg-gradient-to-br from-blue-100 to-purple-200 font-poppins ">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-xl text-lg font-medium shadow-md">
            💬 Chat Between Manager & Employee
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`w-full flex ${
                  msg.senderId === senderId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 max-w-[80%] rounded-2xl shadow-md whitespace-pre-wrap ${
                    msg.senderId === senderId
                      ? "bg-indigo-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-3 border-t bg-white flex items-center gap-2 rounded-b-xl">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-full focus:outline-none font-poppins"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className={`bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700 ${
                !managerId && "opacity-50 cursor-not-allowed"
              }`}
            >
              <SendHorizonal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesEmpVsMan;
