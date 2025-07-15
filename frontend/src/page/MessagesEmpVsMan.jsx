import React, { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useSelector } from 'react-redux';

const MessagesEmpVsMan = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you doing today?', sender: 'receiver' },
    { text: 'I am doing great! Working on the dashboard.', sender: 'sender' },
  ]);

  const [input, setInput] = useState('');

  const {employeeInfo} = useSelector(state => state.user)
  console.log(employeeInfo)

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'sender' }]);
    setInput('');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-teal-400 to-green-400 relative overflow-x-hidden flex">
    <div className="h-[90vh] w-full max-w-lg mx-auto flex flex-col shadow-2xl rounded-xl bg-gradient-to-br from-blue-100 to-purple-200 font-poppins mt-10">
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
              msg.sender === 'sender' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[80%] rounded-2xl shadow-md whitespace-pre-wrap ${
                msg.sender === 'sender'
                  ? 'bg-indigo-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default MessagesEmpVsMan;
