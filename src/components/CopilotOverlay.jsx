import "../BaymaxSmartPanel.css";

// export default function CopilotOverlay({ open, onClose }) {
//   if (!open) return null;

//   return (
//     <div className="copilot-overlay">
//       {/* <div className="copilot-backdrop" onClick={onClose}></div> */}

//       <div className="copilot-window">
//         <div className="copilot-header">
//           <span>Baymax AI Assistant</span>
//           <button onClick={onClose} className="close-btn">✕</button>
//         </div>

//         <iframe
//           src="https://copilotstudio.microsoft.com/environments/1ba33a5b-d052-e598-81ec-4b4b644c889c/bots/copilots_header_78848/webchat?__version__=2"
//           className="copilot-iframe"
//           title="Copilot Chat"
//         />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { DirectLine } from "botframework-directlinejs";
const sarcasticLines = [
  "Pretending to think",
  "Calculating… or just stalling",
  "Downloading thoughts",
  "Optimizing my sarcasm level",
  "Running on 2% intelligenc",
  "Pretending to be smar",
  "Buffering my brain",
  "Rebooting my common sense",
  "Consulting my imaginary superviso",
  "Trying to look productive"
];

const TypingIndicator = ({ text }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 10px",
      marginBottom: "10px",
      color: "#666",
      fontSize: "13px",
      fontWeight: 500
    }}>
      <span>{text}</span>
      <div style={{ display: "flex", gap: "4px" }}>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#4f46e5",
          animation: "typingBlink 1s infinite ease-in-out"
        }}></div>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#4f46e5",
          animation: "typingBlink 1s infinite ease-in-out 0.2s"
        }}></div>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#4f46e5",
          animation: "typingBlink 1s infinite ease-in-out 0.4s"
        }}></div>
      </div>
    </div>
  );
};

function parseActivity(activity) {
  // 1. Plain text message
  if (activity.text) {
    return {
      type: "text",
      text: activity.text
    };
  }

  // 2. Adaptive Card message
  if (activity.attachments?.length > 0) {
    const card = activity.attachments.find(
      a => a.contentType === "application/vnd.microsoft.card.adaptive"
    );

    if (card) {
      return {
        type: "adaptiveCard",
        card: card.content
      };
    }
  }

  // 3. Unknown fallback
  return {
    type: "unknown",
    raw: activity
  };
}

export default function CopilotOverlay({ open, onClose }) {
  if (!open) return null;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const directLineRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingLine, setTypingLine] = useState("Thinking…");
  useEffect(() => {
    // Initialize Direct Line
    const dl = new DirectLine({
      secret: import.meta.env.VITE_DIRECT_LINE_SECRET
    });
    console.log("Direct Line Secret:", import.meta.env.VITE_DIRECT_LINE_SECRET);
    directLineRef.current = dl;
    console.log(dl);
    // Subscribe to bot messages
    dl.activity$.subscribe(activity => {
      console.log("Inside subscribe");
      console.log("Received activity:", JSON.stringify(activity, null, 2));
      if (activity.from?.role !== "bot") {
        return;
      }
      if (activity.type === "message") {
        const parsed = parseActivity(activity);

        setMessages(prev => [...prev, { from: "bot", ...parsed }]);
        setIsTyping(false);
      }

      if (activity.type === "typing") {
        const random = sarcasticLines[Math.floor(Math.random() * sarcasticLines.length)];
        setTypingLine(random);
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
  const AdaptiveCardRenderer = ({ card }) => {
    return (
      <div
        style={{
          background: "white",
          padding: "12px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        {card.body?.map((item, idx) => {
          if (item.type === "TextBlock") {
            return (
              <div key={idx} style={{ marginBottom: "8px", fontWeight: item.weight === "bolder" ? 600 : 400 }}>
                {item.text}
              </div>
            );
          }

          if (item.type === "Image") {
            return (
              <img
                key={idx}
                src={item.url}
                alt=""
                style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
              />
            );
          }

          if (item.type === "Table") {
            return (
              <div key={idx}>
                {item.rows.map((row, rIdx) => (
                  <div key={rIdx} style={{ display: "flex", marginBottom: "10px" }}>
                    {row.cells.map((cell, cIdx) => (
                      <div key={cIdx} style={{ flex: 1 }}>
                        {cell.items.map((ci, ciIdx) => {
                          if (ci.type === "Image") {
                            return (
                              <img
                                key={ciIdx}
                                src={ci.url}
                                style={{ width: "80px", borderRadius: "8px" }}
                              />
                            );
                          }
                          if (ci.type === "TextBlock") {
                            return (
                              <div key={ciIdx} style={{ fontWeight: ci.weight === "bolder" ? 600 : 400 }}>
                                {ci.text}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        {/* Render actions */}
        {card.actions?.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {card.actions.map((action, idx) => (
              <button
                key={idx}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: action.style === "positive" ? "#4f46e5" : "#e11d48",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                {action.title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (

    <div className="copilot-overlay">
      <div className="copilot-window">
        <div className="copilot-header">
          <span>Baymax AI Assistant</span>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        <     div style={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.bubble,
                alignSelf: m.from.id === "user1" ? "flex-end" : "flex-start",
                background: m.from.id === "user1" ? "#DCF8C6" : "#FFF"
              }}
            >
              {m.text !== undefined ? (
                <span>{m.text}</span>
              ) : (
                <AdaptiveCardRenderer card={m.card} />
              )}
            </div>
          ))}
          {isTyping && (
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
              Processing your request like a responsible AI
            </div>
          ) && <TypingIndicator text={typingLine} />}
        </div>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message…"
          />
          <button style={styles.button} onClick={sendMessage}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
          >Send</button>
        </div>
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

    color: "#111"            // FIX: readable text
  },
  bubble: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "16px",
    background: "#4f46e5",
    color: "#111",
    maxWidth: "80%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  },
  inputRow: {
    padding: "12px",
    background: "rgba(255,255,255,0.75)",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    display: "flex",
    gap: "10px",
    backdropFilter: "blur(10px)"
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    outline: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
  },
  button: {
    padding: "12px 18px",
    borderRadius: "14px",
    background: "rgba(79, 140, 255, 0.18)",
    color: "white",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
    transition: "0.2s ease"
  }
};
