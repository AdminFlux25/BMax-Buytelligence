import "../CopilotStyle.css";

export default function CopilotBubble({ open, onClick }) {
  if (!open) return null;

  return (
    <div className="copilot-bubble" onClick={onClick}>
      <img src="/baymax-avatar.jpg" alt="Baymax" />
    </div>
  );
}
