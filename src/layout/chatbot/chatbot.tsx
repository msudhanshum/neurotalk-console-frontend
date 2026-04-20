import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/apiConstants";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const quickOptions = [
  "Raise a Ticket",
  "Check Ticket Status",
  "Talk To Support",
  "Other Issue"
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isOtherIssueActive, setIsOtherIssueActive] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! Please choose an option below 👇", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [ticketData, setTicketData] = useState({
    ticketId: "",
    name: "",
    email: "",
    issue: "",
    date: ""
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  // ✅ FIXED: made async
  const handleOptionClick = async (option: string) => {
    const userMessage: Message = { text: option, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setShowOptions(false);
    setShowBackButton(false);

    // 🎫 Raise Ticket
    if (option === "Raise a Ticket") {
      const today = new Date().toLocaleDateString();
      const randomId = "TCK" + Math.floor(1000 + Math.random() * 9000);

      setTicketData({
        ticketId: randomId,
        name: "",
        email: "",
        issue: "",
        date: today
      });

      setShowTicketModal(true);
      return;
    }

    // 📞 Talk to Support
    if (option === "Talk To Support") {
      setMessages((prev) => [
        ...prev,
        {
          text: "⏳ Please wait while we connect you to an agent...",
          sender: "bot",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text:
              "❌ All our agents are busy at the moment. Please try later or email: abc@gmail.com",
            sender: "bot",
          },
        ]);

        setShowBackButton(true);
      }, 30000);

      return;
    }

    // ✍️ Other Issue
    if (option === "Other Issue") {
      setIsOtherIssueActive(true);

      setMessages((prev) => [
        ...prev,
        {
          text: "✍️ Please type your issue below and press submit.",
          sender: "bot",
        },
      ]);

      return;
    }

    // 🎫 CHECK TICKET STATUS (FULL FIXED)
    if (option === "Check Ticket Status") {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      try {
        const res = await axios.get(
          API_ENDPOINTS.TICKETS.GET_TICKET,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const tickets = res.data.tickets;

        if (!tickets || tickets.length === 0) {
          setMessages((prev) => [
            ...prev,
            { text: "📭 No tickets found.", sender: "bot" }
          ]);
        } else {
          // ✅ FIXED: no loop state issue
          const botMessages = tickets.map((t: any) => ({
            text: `Ticket ID: ${t.ticketId}
Status: ${t.status}`,
            sender: "bot"
          }));

          setMessages((prev) => [...prev, ...botMessages]);
        }

      } catch (error) {
        console.log("❌ Fetch ticket error:", error);

        setMessages((prev) => [
          ...prev,
          { text: "❌ Failed to fetch tickets.", sender: "bot" }
        ]);
      }

      setShowBackButton(true);
      return;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user" },
      {
        text: "✅ Thanks for sharing your issue. Our team will review it shortly.",
        sender: "bot",
      },
    ]);

    setInput("");
    setIsOtherIssueActive(false);
    setShowBackButton(true);
  };

  const handleTicketSubmit = async () => {
    if (!ticketData.name || !ticketData.email || !ticketData.issue) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const res = await axios.post(
        API_ENDPOINTS.TICKETS.CREATE_TICKET,
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("✅ Ticket saved:", res.data);

      setShowTicketModal(false);

      setMessages((prev) => [
        ...prev,
        {
          text: `✅ Ticket Created Successfully! ID: ${ticketData.ticketId}`,
          sender: "bot",
        },
      ]);

    } catch (error) {
      console.log("❌ Ticket error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Failed to create ticket. Try again.",
          sender: "bot",
        },
      ]);
    }

    setShowBackButton(true);
  };

  const handleCancelTicket = () => {
    setShowTicketModal(false);

    setMessages((prev) => [
      ...prev,
      {
        text: "❌ Ticket not created.",
        sender: "bot",
      },
    ]);

    setShowBackButton(true);
  };

  const handleBackToMenu = () => {
    setShowOptions(true);
    setShowBackButton(false);
    setIsOtherIssueActive(false);

    setMessages((prev) => [
      ...prev,
      {
        text: "🔄 Please choose an option again 👇",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <span>Support Chat</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            <div ref={bottomRef} />

            {showOptions && (
              <div className="quick-options">
                {quickOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="option-btn"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {showBackButton && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button className="option-btn" onClick={handleBackToMenu}>
                  ⬅️ Back to Menu
                </button>
              </div>
            )}
          </div>

          {isOtherIssueActive && (
            <div className="chat-footer">
              <input
                type="text"
                placeholder="Describe your issue..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Submit</button>
            </div>
          )}
        </div>
      )}

      <button className="chat-toggle" onClick={toggleChat}>
        💬
      </button>

      {showTicketModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Raise a Ticket</h3>

            <input value={ticketData.ticketId} disabled />
            <input value={ticketData.date} disabled />

            <input
              type="text"
              placeholder="Your Name"
              value={ticketData.name}
              onChange={(e) =>
                setTicketData({ ...ticketData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Your Email"
              value={ticketData.email}
              onChange={(e) =>
                setTicketData({ ...ticketData, email: e.target.value })
              }
            />

            <textarea
              placeholder="Describe your issue"
              value={ticketData.issue}
              onChange={(e) =>
                setTicketData({ ...ticketData, issue: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={handleTicketSubmit}>Submit</button>
              <button onClick={handleCancelTicket}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;