import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm OXI . Ask me about:\n• Features\n• Account\n• Support\n• Documentation" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Respuestas inteligentes
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    switch(true) {
      case lowerMessage.includes('hello') || lowerMessage.includes('hi'):
        return "Hello! How can I assist you today? 😊";
      case lowerMessage.includes('feature'):
        return "Our main features:\n1. Real-time analytics\n2. Custom dashboards\n3. Team collaboration\n4. API integration";
      case lowerMessage.includes('account'):
        return "Account settings help:\n1. Go to Profile\n2. Click Settings\n3. Manage preferences\nNeed more help?";
      case lowerMessage.includes('support'):
        return "Contact support:\n📧 support@oxi.com\n📞 +1-800-OXI-HELP\nWe're here 24/7!";
      case lowerMessage.includes('documentation'):
        return "Check our docs:\n📚 https://docs.oxi.com\nWe have guides & API references!";
      default:
        return "I'm constantly learning! For complex questions, contact our support team. 🚀";
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const sendMessage = (e) => {
    e.preventDefault(); // Añadir esto para prevenir el comportamiento por defecto del formulario
    if (!input.trim()) return;
    
    // Mensaje del usuario
    const userMessage = { from: "user", text: input.trim() };
    setMessages(msgs => [...msgs, userMessage]);
    setInput("");

    // Simular typing
    setIsTyping(true);
    
    // Respuesta del bot después de 1s
    setTimeout(() => {
      const botResponse = {
        from: "bot",
        text: getBotResponse(input.trim())
      };
      setMessages(msgs => [...msgs, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <>
      <motion.button
        onClick={toggleChat}
        aria-label="Toggle chat bot"
        className="fixed bottom-6 right-1 w-40 h-40 rounded-full flex items-center justify-center cursor-pointer z-50 bg-transparent shadow-none"
        animate={floatingAnimation}
      >
        <img
          src="/logosolo.png"
          alt="OXI Logo"
          className="w-32 h-32 transform hover:scale-105 transition-transform"
          draggable={false}
        />
      </motion.button>

      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-44 right-10 bg-emerald-500 text-white text-sm rounded-lg px-4 py-2 shadow-xl z-50 select-none pointer-events-none"
            style={{
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
              transformOrigin: "bottom right"
            }}
          >
            <span>Ask OXI</span>
            <div className="absolute -bottom-2 right-3 w-4 h-4 bg-emerald-500 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-44 right-10 w-80 max-w-full bg-[#121212] rounded-xl shadow-2xl flex flex-col z-50 border border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-900">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-white font-semibold">OXI Assistant</h4>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-3 bg-gray-800/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[80%] relative ${
                      msg.from === "bot"
                        ? "bg-emerald-600 text-white rounded-tl-none"
                        : "bg-gray-700 text-white rounded-tr-none"
                    }`}
                    style={{
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className="mb-1 last:mb-0">{line}</p>
                    ))}
<span className="absolute bottom-2 right-2 text-xs text-white/50">                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 p-3">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-3 border-t border-gray-700 bg-gray-900">
              <div className="relative flex gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask OXI anything..."
                  className="flex-1 resize-none rounded-xl bg-gray-800 text-white px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  style={{
                    minHeight: "44px",
                    maxHeight: "120px"
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-3 bottom-2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};

export default ChatBot;