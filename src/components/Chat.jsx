import React, { useEffect, useState, useRef } from "react";
import { DirectLine } from "botframework-directlinejs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const directLineRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize Direct Line
    const dl = new DirectLine({
  secret: import.meta.env.VITE_DIRECT_LINE_SECRET
});
    console.log("Direct Line Secret:", import.meta.env.VITE_DIRECT_LINE_SECRET);
    directLineRef.current = dl;
    console.log(dl) ;
    // Subscribe to bot messages
    dl.activity$.subscribe(activity => {
        console.log("Inside subscribe") ;
        console.log("Received activity:", JSON.stringify(activity, null, 2));
      if (activity.type === "message" && activity.text) {
            setMessages(prev => [...prev, { from: "bot", text: activity.text }]);
            setIsTyping(false);
        }

        if (activity.type === "typing") {
            setIsTyping(true);
        }
    });
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    directLineRef.current.postActivity({
      from: { id: "user1", name: "User" },
      type: "message",
      text: input
    }).subscribe();

    setMessages(prev => [
      ...prev,
      { from: { id: "user1" }, text: input, type: "message" }
    ]);

    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        console.log("Direct Line Secret:", import.meta.env.VITE_DIRECT_LINE_SECRET);
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.bubble,
              alignSelf: m.from.id === "user1" ? "flex-end" : "flex-start",
              background: m.from.id === "user1" ? "#DCF8C6" : "#FFF"
            }}
          >
            {m.text}
          </div>
        ))}
        {isTyping && (
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                Assistant is typing…
            </div>
            )}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message…"
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5"
  },
  messages: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "#f7f7f7",   // FIX: light grey background
    color: "#111"            // FIX: readable text
  },
  bubble: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "16px",
    background: m.from === "user" ? "#4f46e5" : "#ffffff",
    color: m.from === "user" ? "#fff" : "#111",
    maxWidth: "80%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  },
  inputRow: {
    display: "flex",
    padding: 10,
    background: "#fff",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    marginLeft: 10,
    padding: "10px 16px",
    fontSize: 16,
    borderRadius: 6,
    background: "#0078FF",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};
