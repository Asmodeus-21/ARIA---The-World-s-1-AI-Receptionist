import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./aria-elevenlabs.css";

interface AriaVoiceAgentProps {
  agentId: string;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": any;
    }
  }
}

const AriaVoiceAgent: React.FC<AriaVoiceAgentProps> = ({ agentId, isOpen, onClose }) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (widgetRef.current?.startSession) {
          widgetRef.current.startSession();
        }
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="aria-overlay" onClick={onClose}>
      <div className="aria-container" onClick={(e) => e.stopPropagation()}>
        <button className="aria-close-button" onClick={onClose} aria-label="Close">
          <X size={28} />
        </button>
        
        <div className="aria-widget-wrapper">
          <elevenlabs-convai
            ref={widgetRef}
            agent-id={agentId}
            auto-start="true"
          ></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default AriaVoiceAgent;
