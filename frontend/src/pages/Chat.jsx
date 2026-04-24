import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Search, Send } from "lucide-react";
import { getConversations, getConversationById } from "../api/conversations";
import { getMessages, sendMessage as sendMessageAPI } from "../api/messages";

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
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setCurrentUserId(parsedUser.id);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getConversations();
        setConversations(response.data);
        
        // Set active conversation from navigation state or use first conversation
        const conversationIdFromNav = location.state?.conversationId;
        if (conversationIdFromNav) {
          setActiveConversationId(conversationIdFromNav);
        } else if (response.data.length > 0) {
          setActiveConversationId(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [location.state]);

  // Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConversationId) return;

    const fetchMessages = async () => {
      try {
        const response = await getMessages(activeConversationId);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeConversationId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !activeConversationId) return;

    setSendingMessage(true);
    try {
      const response = await sendMessageAPI(activeConversationId, input);
      setMessages([...messages, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const activeConversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  if (loading) {
    return (
      <div className="chatpage_container">
        <Navbar />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading conversations...</div>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="chatpage_container">
        <Navbar />
        <div style={{ padding: "20px", textAlign: "center" }}>No conversations yet</div>
      </div>
    );
  }

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
          const lastMsg = conv.lastMessage;

          return (
            <div
              key={conv._id}
              className={`chatpage_conversation ${
                conv._id === activeConversationId ? "active" : ""
              }`}
              onClick={() => setActiveConversationId(conv._id)}
            >
              <img
                src={conv.otherUser?.avatar || "https://i.pravatar.cc/40?img=0"}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />

                <div className="chatpage_conv-details">
                  <strong>{conv.otherUser?.name || "Unknown"}</strong>
                  <p style={{ fontSize: "13px", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px",}}>
                    {lastMsg || "No messages yet"}
                  </p>
                  
                </div>

                <div className="chatpage_conv-date">
                    {formatConversationTime(conv.updatedAt)}
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
            src={activeConversation.otherUser?.avatar || "https://i.pravatar.cc/40?img=0"}
            alt=""
            style={{ width: "40px", borderRadius: "50%" }}
          />

          <div>
            <div>{activeConversation.otherUser?.name || "Unknown"}</div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              Active
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chatpage_messagesWrapper">
          <div className="chatpage_messagesContainer">

            {messages.map((msg) => {
              const isReceived = msg.sender?.id !== currentUserId;
              
              return (
                <div
                  key={msg._id}
                  className={`chatpage_message ${isReceived ? "received" : "sent"}`}
                >
                  {isReceived && (
                    <img
                      src={msg.sender?.avatar || "https://i.pravatar.cc/40?img=0"}
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
                      {formatMessageTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}

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
              onKeyDown={(e) => e.key === "Enter" && !sendingMessage && sendMessage()}
              disabled={sendingMessage}
            />

            <button
              className="chatpage_sendBtn"
              onClick={sendMessage}
              disabled={sendingMessage}
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