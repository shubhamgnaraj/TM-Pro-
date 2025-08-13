import React, { useEffect, useMemo, useState, useCallback } from "react";
import { IoAddCircleOutline, IoSend } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import IsModal from "../components/messages/IsModal";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmployees,
  fetchAllMessages,
  getLoggedInEmployee,
} from "../service/service";
import { useParams } from "react-router";
import socket from "../utils/socket";
import MagicLoader from "../components/MagicLoader";

function MsgEmpVsManAndAi() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [managerId, setManagerId] = useState("");
  const [messages, setMessages] = useState([]);

  const { id: receiveIdFromURL } = useParams();
  const dispatch = useDispatch();
  const { loggedEmployee, employeeInfo } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const managers = employeeInfo?.filter((m) => m.position === "manager");
  const isEmployee = loggedEmployee?.position === "employee";

  const senderId = loggedEmployee?._id;
  const receiverId = isEmployee ? managerId : receiveIdFromURL;

  const chatId = useMemo(() => {
    return receiverId && senderId
      ? [senderId, receiverId].sort().join("_")
      : null;
  }, [senderId, receiverId]);

  useEffect(() => {
    if (token) {
      dispatch(getLoggedInEmployee(decode.id));
      dispatch(fetchAllEmployees());
    }
  }, [dispatch, token, decode.id]);

  const handleReceive = useCallback((msg) => {
    setMessages((prev) => {
      if (msg._id && prev.some((m) => m._id === msg._id)) return prev;
      return [...prev, msg];
    });
  }, []);

 useEffect(() => {
  if (!chatId) return;

  let isMounted = true;

  // ✅ Load chat history only
  const loadMessages = async () => {
    try {
      const data = await fetchAllMessages(chatId);
      if (isMounted) setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  loadMessages();

  return () => {
    isMounted = false;
  };
}, [chatId]);

useEffect(() => {
  if (!chatId) return;

  socket.emit("joinRoom", chatId);

  const handleReceive = (msg) => {
    setMessages((prev) => {
      if (msg._id && prev.some((m) => m._id === msg._id)) return prev;
      return [...prev, msg];
    });
  };

  socket.on("receiveMessage", handleReceive);

  return () => {
    socket.off("receiveMessage", handleReceive);
  };
}, [chatId]);

  const handleSend = () => {
    if (!messageInput.trim() || !receiverId) return;

    socket.emit("sendMessage", {
      chatId,
      senderId,
      receiverId,
      content: messageInput,
    });

    setMessageInput("");
  };

  if (!loggedEmployee || !employeeInfo) return <MagicLoader />;

  return (
    <div className="w-full h-screen">
      <div className="partOne h-full w-[30%] bg-slate-200 relative">
        {/* Header */}
        <header className="w-full py-4 px-2 bg-slate-100 flex items-center justify-between">
          <div>
            {loggedEmployee?.position === "employee" ? (
              <select
                onChange={(e) => setManagerId(e.target.value)}
                value={managerId}
                className="mb-4 outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition capitalize"
              >
                <option value="">Select Manager</option>
                {managers?.length > 0 ? (
                  managers.map((mgr) => (
                    <option key={mgr._id} value={mgr._id}>
                      {mgr.firstname + " " + mgr.lastname}
                    </option>
                  ))
                ) : (
                  <option disabled>No Managers Found</option>
                )}
              </select>
            ) : (
              <h1 className="flex items-center gap-x-2 py-2 px-4 bg-slate-200 rounded-xl font-semibold cursor-pointer hover:bg-white">
                <span className="font-semibold text-lg">
                  <IoAddCircleOutline />
                </span>
                Collabrator
              </h1>
            )}
          </div>

          <h1
            className="flex items-center gap-x-2 py-2 px-4 bg-slate-200 rounded-xl font-semibold cursor-pointer hover:bg-white"
            onClick={() => setIsModelOpen(true)}
          >
            <span className="font-semibold text-lg">
              <FiUsers />
            </span>
            Employees
          </h1>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 chatBox">
          {messages.map((msg) => (
            <div
              key={msg._id}
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
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="absolute bottom-0 left-0 w-full py-4 px-2 border border-slate-100 flex items-center justify-center gap-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-full focus:outline-none font-poppins bg-white"
          />
          <button
            onClick={handleSend}
            disabled={!managerId && isEmployee}
            className={`bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700 ${
              (!managerId && isEmployee) && "opacity-50 cursor-not-allowed"
            }`}
          >
            <IoSend size={20} />
          </button>
        </div>

        {/* Modal */}
        <IsModal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />
      </div>
      <div className="partTwo"></div>
    </div>
  );
}

export default MsgEmpVsManAndAi;
