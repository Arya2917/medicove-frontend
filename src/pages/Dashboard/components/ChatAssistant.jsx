import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from './../../../hooks/useAuth';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [useBotpress, setUseBotpress] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (useBotpress) {
      // Load Botpress scripts when Botpress mode is active
      const injectScript = document.createElement('script');
      injectScript.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
      injectScript.id = "botpress-inject-script";
      document.body.appendChild(injectScript);
      
      // Load configuration script after inject script is loaded
      injectScript.onload = () => {
        const configScript = document.createElement('script');
        configScript.src = "https://files.bpcontent.cloud/2025/03/24/07/20250324070141-TV7VSN69.js";
        configScript.id = "botpress-config-script";
        document.body.appendChild(configScript);
        
        // Customize Botpress webchat after config is loaded
        configScript.onload = () => {
          if (window.botpressWebChat) {
            window.botpressWebChat.init({
              // Custom botpress config options
              hideWidget: true,
              containerWidth: '100%',
              layoutWidth: '100%',
              showConversationsButton: false,
              stylesheet: `
                .bpw-layout {
                  border-radius: 0.5rem;
                  width: 100% !important;
                  height: 100% !important;
                }
                .bpw-header-container {
                  background-color: #0d9488 !important;
                }
              `,
            });
            
            // Show the webchat
            setTimeout(() => {
              window.botpressWebChat.sendEvent({ type: 'show' });
              
              // Send user info to bot if available
              if (user) {
                window.botpressWebChat.mergeConfig({
                  userId: user.id,
                  extraData: {
                    name: user.name,
                    email: user.email,
                  }
                });
              }
            }, 500);
          }
        };
      };
    }
    
    return () => {
      // Clean up scripts when component unmounts or when switching to basic chat
      const injectScript = document.getElementById('botpress-inject-script');
      const configScript = document.getElementById('botpress-config-script');
      
      if (injectScript) document.body.removeChild(injectScript);
      if (configScript) document.body.removeChild(configScript);
      
      // Hide botpress widget if it exists
      if (window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      }
    };
  }, [useBotpress, user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add user message to local chat
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
      setNewMessage("");
      
      if (!useBotpress) {
        // Simulate local bot response
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
    }
  };

  const toggleChatSystem = () => {
    setUseBotpress(!useBotpress);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Chat with Healthcare Assistant</h2>
        <button 
          onClick={toggleChatSystem} 
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          {useBotpress ? "Switch to Basic Chat" : "Switch to AI Assistant"}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-240px)] flex flex-col">
        {useBotpress ? (
          // Botpress chat container
          <div id="botpress-webchat-container" className="h-full w-full"></div>
        ) : (
          // Basic chat implementation
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;