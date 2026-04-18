import { useEffect, useState } from "react";
import { DirectLine } from "botframework-directlinejs";

export default function BaymaxChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Connect to Copilot Studio
  const [directLine, setDirectLine] = useState(null);

    useEffect(() => {
    async function init() {
        const token = await getToken();
        setDirectLine(new DirectLine({ token }));
    }
    init();
    }, []);

  useEffect(() => {
    if (!directLine) return;

    const subscription = directLine.activity$.subscribe(activity => {
        if (activity.type === "message" && activity.from.role === "bot") {
        setMessages(prev => [...prev, { from: "bot", text: activity.text }]);
        }
    });

    return () => subscription.unsubscribe();
    }, [directLine]);

async function getToken() {
  const res = await fetch("https://1ba33a5bd052e59881ec4b4b644c88.9c.environment.api.powerplatform.com/powervirtualagents/botsbyschema/copilots_header_78848/directline/token?api-version=2022-03-01-preview", {
    method: "POST"
  });

  const json = await res.json();
  return json.token;
}

  function sendMessage() {
    if (!input.trim() || !directLine) return;

    setMessages(prev => [...prev, { from: "user", text: input }]);

    directLine.postActivity({
        from: { id: "user", role: "user" },
        type: "message",
        text: input
    }).subscribe();

    setInput("");
  }

  return (
    <div className="baymax-chat-panel">
      <div className="baymax-chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="baymax-chat-footer">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Baymax anything…"
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
