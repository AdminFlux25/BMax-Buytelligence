import "../BaymaxSmartPanel.css";
import ProfileScanner from "./IdentifyProfile";
import DashboardOverlay from "./DashboardOverlay";
import React, { useState, useEffect } from "react";


export default function BaymaxSmartPanel({ onActivate,onOpenDashboard  }) {
      const [profileReady, setProfileReady] = useState(false);
  const [showName, setShowName] = useState(false);
const [showDashboard, setShowDashboard] = useState(false);
const [open, setOpen] = useState(false);

  useEffect(() => {
    if (profileReady) {
      // Micro delay before showing the name
      const timer = setTimeout(() => setShowName(true), 250);
      return () => clearTimeout(timer);
    }
  }, [profileReady]);
    function openAgent() {
    const wrapper = document.getElementById("copilot-wrapper");
    
    wrapper.style.display = "block";

    }
  return (
    <div className="baymax-ai-panel">
      {!profileReady && (
        <ProfileScanner onComplete={() => setProfileReady(true)} />
      )}
      {profileReady && (
        <div className="panel-slide-in">
          <div className="baymax-ai-header">
        <div className="baymax-ai-text">
          {showName ? (
              <div className="welcome-text">Welcome back, Hiro.</div>
            ) : (
              <div className="welcome-placeholder"></div>
            )}
        </div>
        
<div className="profile-switcher">
  <button className="profile-button" onClick={() => setOpen(true)}>
    👤
  </button>

  {open && (
    <div className="profile-overlay" onClick={() => setOpen(false)}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-title">Choose Your Profile</div>

        <div className="profile-list">
          <div className="profile-item">Tadashi</div>
          <div className="profile-item">GoGo </div>
          <div className="profile-item">Wasabi</div>
        </div>

        <div className="profile-close" onClick={() => setOpen(false)}>
          Close
        </div>
      </div>
    </div>
  )}
</div>


        
      </div>
      <div className="baymax-ai-body">
        <div className="baymax-ai-holo-section">
            <div className="holo-card attention">
                <div className="holo-glow"></div>
                <p>BMax Remembers Everything</p>
            </div>

            <div className="holo-card" onClick={onOpenDashboard}>
                <div className="holo-glow"></div>
                <p>Visualize Your Spendings</p>
            </div>
  
            <div className="holo-card">
                <div className="holo-glow"></div>
                <p>Shop. Save. Smile</p>
            </div>
            </div>
      </div>
      <div className="baymax-ai-footer">
        <div className="baymax-3d-orb" onClick={onActivate}>
  <div className="baymax-eyes">
  <div className="baymax-eyelid"></div>
</div>
</div>

      </div>
        </div>
      )}
      

      

      
    </div>
  );
}
