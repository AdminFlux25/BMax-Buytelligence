import "../BaymaxSmartPanel.css";

export default function CopilotOverlay({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="copilot-overlay">
      {/* <div className="copilot-backdrop" onClick={onClose}></div> */}

      <div className="copilot-window">
        <div className="copilot-header">
          <span>Baymax AI Assistant</span>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <iframe
          src="https://copilotstudio.microsoft.com/environments/1ba33a5b-d052-e598-81ec-4b4b644c889c/bots/copilots_header_78848/webchat?__version__=2"
          className="copilot-iframe"
          title="Copilot Chat"
        />
      </div>
    </div>
  );
}
