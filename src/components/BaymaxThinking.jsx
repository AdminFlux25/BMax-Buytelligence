export default function BaymaxThinking() {
  return (
    <div className="baymax-thinking-overlay">
      <div className="baymax-thinking-box">
        <div className="baymax-eyes">
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>

        <div className="baymax-text">
          I am processing your request…
        </div>

        <div className="baymax-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}
