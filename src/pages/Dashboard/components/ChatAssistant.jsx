import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add user message
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
      setNewMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            id: Date.now(), 
            text: "Thank you for your message. A healthcare assistant will respond shortly. If you have a medical emergency, please call 1066 immediately.", 
            sender: "bot" 
          }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat with Healthcare Assistant</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-240px)] flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              type="submit"
              className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;