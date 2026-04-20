import React, { useEffect, useState } from "react";
import "../ProfileScanner.css";

export default function ProfileScanner({ onComplete }) {
  const [stage, setStage] = useState("calling"); 
  // calling → identifying → done

  useEffect(() => {
    const timers = [];

    // Stage 1: Calling Copilot Agent
    //timers.push(setTimeout(() => setStage("identifying"), 2000));

    // Stage 2: Identifying You
    timers.push(setTimeout(() => {
      setStage("done");
      onComplete && onComplete();
    }, 3500));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="scanner-container">
      {stage !== "done" && (
        <>
          <div className="pulse-orb"></div>

          <div className="scanner-text">
            {stage === "calling" && "Identifying profile…please don’t blink, it confuses the sensors"}
            {stage === "identifying" && "Identifying you…"}
          </div>
        </>
      )}
    </div>
  );
}
