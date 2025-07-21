import { useEffect, useState,useMemo } from "react";
import { SendHorizonal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchAllEmployees, fetchAllMessages, getLoggedInEmployee } from "../service/service";
import socket from "../utils/socket";
import { useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import MagicLoader from "../components/MagicLoader";

const MessagesEmpVsMan = () => {
  const [messages, setMessages] = useState([]);
  const [managerId, setManagerId] = useState("");
  const [input, setInput] = useState("");

  const { id: receiveIdFromURL } = useParams();
  const dispatch = useDispatch();

  const { employeeInfo, loggedEmployee } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const senderId = loggedEmployee?._id;
  const isEmployee = loggedEmployee?.position === "employee";
  const receiverId = isEmployee ? managerId : receiveIdFromURL;

  const chatId = useMemo(() => {
    return receiverId && senderId
      ? [senderId, receiverId].sort().join("_")
      : null;
  }, [senderId, receiverId]);

  const managers = employeeInfo?.filter((u) => u.position === "manager");

  useEffect(() => {
    if (token) {
      dispatch(getLoggedInEmployee(decode.id));
      dispatch(fetchAllEmployees());
    }
  }, [dispatch, token, decode.id]);

  useEffect(() => {
    if (!chatId) return;
    fetchAllMessages(chatId).then((data) => setMessages(data));
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    socket.emit("joinRoom", chatId);

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [chatId]);

  const handleSend = () => {
    if (!input.trim() || !receiverId) return;

    socket.emit("sendMessage", {
      chatId,
      senderId,
      receiverId,
      content: input,
    });
    setInput("");
  };

  if (!loggedEmployee || !employeeInfo) return <MagicLoader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-teal-400 to-green-400 relative overflow-x-hidden py-5 px-10">
      <div>
        {loggedEmployee?.position === "employee" && (
          <select
            onChange={(e) => setManagerId(e.target.value)}
            value={managerId}
            className="mb-4  outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition capitalize"
          >
            <option value="">Select Manager</option>
            {managers?.length > 0 ? (
              managers?.map((mgr) => (
                <option key={mgr._id} value={mgr._id} >
                  {mgr.firstname + " " + mgr.lastname}
                </option>
              ))
            ) : (
              <option disabled>No Managers Found</option>
            )}
          </select>
        )}
      </div>

      <div>
        <div className="  h-[90vh] w-full max-w-lg mx-auto flex flex-col shadow-2xl rounded-xl bg-gradient-to-br from-blue-100 to-purple-200 font-poppins ">
          {/* Header */}

          <div className="w-full flex items-center px-2 justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-xl shadow-md">
            <div className=" text-lg font-medium ">
              💬 Chat Between Manager & Employee
            </div>

            <div className="bg-[#a37bf4c2] rounded-full p-2 cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 chatBox">
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
                  {msg.content}
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
                !managerId || !isEmployee &&
                  "opacity-50 cursor-not-allowed"
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
