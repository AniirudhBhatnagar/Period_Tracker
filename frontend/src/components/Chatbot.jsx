import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your wellbeing assistant. Ask me anything about your cycle, symptoms, or how you're feeling 💖" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setLoading(true);
    setInput("");
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.text }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, I couldn't connect to the AI." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="chatbot-icon"
        onClick={() => setIsChatOpen((open) => !open)}
        style={{ zIndex: 9999 }}
      >
        💬
      </div>

      {isChatOpen && (
        <div className="chatbot-popup">
          <div style={{ fontWeight: "bold", marginBottom: 12 }}>Wellbeing Chatbot</div>
          <div style={{ flex: 1, overflowY: "auto", width: "100%", marginBottom: 12, maxHeight: 250 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.from === "user" ? "right" : "left",
                margin: "8px 0"
              }}>
                <span style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 12,
                  background: msg.from === "user" ? "#fce7f3" : "#f3f4f6",
                  color: msg.from === "user" ? "#be185d" : "#6d28d9",
                  maxWidth: "80%",
                  wordBreak: "break-word"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <input
              style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "8px 0 0 8px",
                padding: "8px",
                outline: "none"
              }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your question…"
              disabled={loading}
            />
            <button
              style={{
                background: "#ec4899",
                color: "white",
                border: "none",
                borderRadius: "0 8px 8px 0",
                padding: "8px 16px",
                cursor: "pointer"
              }}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            style={{
              marginTop: 12,
              background: "#ec4899",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}