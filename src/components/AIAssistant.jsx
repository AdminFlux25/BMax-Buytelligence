import { useState } from "react";

    export default function AIAssistant() {
    function openAgent() {
    const wrapper = document.getElementById("copilot-wrapper");
    
    wrapper.style.display = "block";

    }

  return (
    <div className="ai-bubble" onClick={openAgent}>
      🤖
    </div>
  );
}
