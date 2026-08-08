declare global {
  interface Window {
    tidioChatApi?: {
      open: () => void;
      close: () => void;
      show: () => void;
      hide: () => void;
      on: (event: string, callback: (...args: any[]) => void) => void;
      setVisitorData: (data: Record<string, any>) => void;
      messageFromVisitor: (text: string) => void;
    };
  }
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const [isTidioLoaded, setIsTidioLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tidioKey = import.meta.env.VITE_TIDIO_PUBLIC_KEY;

  useEffect(() => {
    // Check if Tidio is already loaded or key is available
    if (window.tidioChatApi) {
      setIsTidioLoaded(true);
      return;
    }

    if (tidioKey) {
      const existingScript = document.getElementById("tidio-chat-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "tidio-chat-script";
        script.src = `//code.tidio.co/${tidioKey}.js`;
        script.async = true;
        script.onload = () => setIsTidioLoaded(true);
        document.body.appendChild(script);
      }
    }
  }, [tidioKey]);

  const toggleChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
      setShowTooltip(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to Akirapa Home Care. How can we assist you with in-home care for your loved one today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    setTimeout(() => {
      let replyText = "Thank you for reaching out! Our team in Burlington, MA is available 24/7. You can also call us directly at 339 970 1214 for immediate assistance.";
      const lower = text.toLowerCase();

      if (lower.includes("cost") || lower.includes("price") || lower.includes("rate") || lower.includes("quote")) {
        replyText = "We offer flexible hourly, daily, and 24/7 care plans tailored to your needs. You can use our Free Care Cost Estimator on the homepage or schedule a free assessment!";
      } else if (lower.includes("assessment") || lower.includes("schedule") || lower.includes("book") || lower.includes("appointment")) {
        replyText = "We would love to arrange a free, no-obligation in-home assessment! Click the 'Schedule Free Assessment' button or call 339 970 1214.";
      } else if (lower.includes("services") || lower.includes("alzheimer") || lower.includes("dementia") || lower.includes("respite")) {
        replyText = "Akirapa Home Care provides Personal Care, 24/7 Companion Care, Respite Support, Post-Hospital Recovery, and Specialized Alzheimer's & Dementia Care.";
      } else if (lower.includes("location") || lower.includes("address") || lower.includes("where")) {
        replyText = "Our primary office is located at 83 Cambridge Street, Burlington, MA 01803, serving seniors across Massachusetts.";
      } else if (lower.includes("phone") || lower.includes("call") || lower.includes("number") || lower.includes("contact")) {
        replyText = "Our 24/7 Helpline Support numbers are: 339 970 1214 and 781 472 9375. We are ready to assist you any time day or night!";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-24 right-6 sm:right-8 z-50 flex flex-col items-end pointer-events-auto">
      {/* Floating Tooltip Bubble when unopened */}
      {!isOpen && showTooltip && (
        <div className="mb-3 bg-white/95 backdrop-blur-md text-[#76248a] font-bold text-xs py-2 px-4 rounded-2xl shadow-xl border border-[#76248a]/20 flex items-center gap-2 animate-bounce">
          <i className="fa-solid fa-comments text-[#76248a]"></i>
          <span>Chat with Akirapa Assistant</span>
          <button
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="ml-1 text-gray-400 hover:text-gray-600"
          >
            <i className="fa-solid fa-xmark text-xs text-gray-400"></i>
          </button>
        </div>
      )}

      {/* Floating Chat Bot Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative w-14 h-14 rounded-full bg-[#76248a] hover:bg-[#561868] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-white"
          aria-label="Open Live Chatbot"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#40ddd3] border-2 border-white animate-pulse" />
          <i className="fa-solid fa-robot text-2xl text-white transition-transform group-hover:rotate-12"></i>
        </button>
      )}

      {/* Interactive Floating Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#76248a] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                <i className="fa-solid fa-robot text-lg text-white"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight text-white">Akirapa Assistant</h3>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#40ddd3] animate-pulse"></span>
                  <span className="text-[11px] text-white/90 font-medium">24/7 Support Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="tel:3399701214"
                title="Call 24/7 Helpline"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <i className="fa-solid fa-phone text-xs text-white"></i>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm text-white"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-[#76248a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <i className="fa-solid fa-robot text-xs text-white"></i>
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl space-y-1 ${
                    msg.sender === "user"
                      ? "bg-[#76248a] text-white rounded-br-none shadow-sm"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span
                    className={`block text-[10px] text-right ${
                      msg.sender === "user" ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex flex-wrap gap-1.5 text-[11px]">
            <button
              onClick={() => handleSend("Tell me about care services")}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#76248a] hover:text-white text-gray-700 transition-colors font-medium flex items-center gap-1.5 group"
            >
              <span className="w-4 h-4 rounded-full bg-[#76248a] group-hover:bg-white flex items-center justify-center text-[9px] shrink-0">
                <i className="fa-solid fa-heart text-white group-hover:text-[#76248a]"></i>
              </span>
              <span>Care Services</span>
            </button>

            <button
              onClick={() => handleSend("How can I schedule a free assessment?")}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#76248a] hover:text-white text-gray-700 transition-colors font-medium flex items-center gap-1.5 group"
            >
              <span className="w-4 h-4 rounded-full bg-[#76248a] group-hover:bg-white flex items-center justify-center text-[9px] shrink-0">
                <i className="fa-solid fa-calendar-check text-white group-hover:text-[#76248a]"></i>
              </span>
              <span>Free Assessment</span>
            </button>

            <button
              onClick={() => handleSend("What is your helpline phone number?")}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#76248a] hover:text-white text-gray-700 transition-colors font-medium flex items-center gap-1.5 group"
            >
              <span className="w-4 h-4 rounded-full bg-[#76248a] group-hover:bg-white flex items-center justify-center text-[9px] shrink-0">
                <i className="fa-solid fa-phone text-white group-hover:text-[#76248a]"></i>
              </span>
              <span>24/7 Helpline</span>
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#76248a]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#76248a] hover:bg-[#561868] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
            >
              <i className="fa-solid fa-paper-plane text-xs text-white"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
