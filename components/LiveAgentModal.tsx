import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface LiveAgentModalProps {
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

const LiveAgentModal: React.FC<LiveAgentModalProps> = ({ isOpen, onClose }) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && widgetRef.current) {
      // Auto-start the conversation when modal opens
      setTimeout(() => {
        if (widgetRef.current?.startSession) {
          widgetRef.current.startSession();
        }
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 -right-10 p-2 hover:bg-gray-700 rounded-full transition-colors z-10"
        >
          <X size={32} className="text-white" />
        </button>
        <elevenlabs-convai
          ref={widgetRef}
          agent-id={import.meta.env.VITE_ELEVENLABS_AGENT_ID}
          auto-start="true"
        ></elevenlabs-convai>
      </div>
    </div>
  );
};

export default LiveAgentModal;
