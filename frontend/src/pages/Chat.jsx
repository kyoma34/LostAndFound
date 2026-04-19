import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Search, Send } from "lucide-react";

/* ===== Helper: format time ===== */
const formatMessageTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatConversationTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 60000);

  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return new Date(date).toLocaleDateString();
};

const Chat = () => {
  const messagesEndRef = useRef(null);

  /* ===== Conversations ===== */
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=1",
      status: "Active now",
      messages: [
        {
          text: "Hi! I found your wallet.",
          type: "received",
          time: new Date(),
        },
        {
          text: "Really? That's amazing!",
          type: "sent",
          time: new Date(),
        },
        {
          text: "Yes, near a coffee shop.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/40?img=2",
      status: "Offline",
      messages: [
        {
          text: "Is this still available?",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "Offline",
      messages: [
        {
          text: "Perfect! See you then.",
          type: "received",
          time: new Date(),
        },
      ],
    },
  ]);

  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeId
  );

  /* ===== Auto Scroll ===== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  /* ===== Send Message ===== */
  const sendMessage = () => {
    if (!input.trim()) return;

    const updated = conversations.map((conv) => {
      if (conv.id === activeId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              text: input,
              type: "sent",
              time: new Date(),
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updated);
    setInput("");
  };

  return (
    <div className="chatpage_container">
      <Navbar />
      {/* ===== SIDEBAR ===== */}
      <div className="chatpage_sidebar">
        <div className=" backdrop-blur-lg bg-white/20 rounded-full border border-white/20 shadow-xl">
            <div className="flex items-center px-3 py-1">
                <Search className="flex-shrink-0" size={20} color="#7dafff"/>
                <input
                className="chatpage_search"
                placeholder="Search conversations..."
                />
            </div>
        </div>

        <div className="chatpage_conversations">
        {conversations.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];

          return (
            <div
              key={conv.id}
              className={`chatpage_conversation ${
                conv.id === activeId ? "active" : ""
              }`}
              onClick={() => setActiveId(conv.id)}
            >
              <img
                src={conv.avatar}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />

                <div className="chatpage_conv-details">
                  <strong>{conv.name}</strong>
                  <p style={{ fontSize: "13px", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px",}}>
                    {lastMsg.text}
                  </p>
                  
                </div>

                <div className="chatpage_conv-date">
                    {formatConversationTime(lastMsg.time)}
                </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* ===== CHAT AREA ===== */}
      <div className="chatpage_chatArea">

        {/* HEADER */}
        <div className="chatpage_header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={activeConversation.avatar}
            alt=""
            style={{ width: "40px", borderRadius: "50%" }}
          />

          <div>
            <div>{activeConversation.name}</div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              {activeConversation.status}
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chatpage_messagesWrapper">
          <div className="chatpage_messagesContainer">

            {activeConversation.messages.map((msg, index) => (
              <div
                key={index}
                className={`chatpage_message ${msg.type}`}
              >
                {msg.type === "received" && (
                  <img
                    src={activeConversation.avatar}
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                )}

                <div className="chatpage_msgContent">
                  <div className="chatpage_bubble">{msg.text}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "4px",
                      opacity: 0.6,
                    }}
                  >
                    {formatMessageTime(msg.time)}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>
        </div>

        {/* INPUT */}
        <div className="chatpage_inputWrapper">
          <div className="chatpage_inputContainer">
            <input
              type="text"
              className="chatpage_input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              className="chatpage_sendBtn"
              onClick={sendMessage}
            >
              <Send size={18} className=""/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;