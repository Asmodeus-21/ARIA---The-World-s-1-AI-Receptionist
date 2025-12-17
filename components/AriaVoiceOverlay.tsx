import { useEffect } from "react";
import "./aria-elevenlabs.css";

interface Props {
  agentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AriaVoiceOverlay({ agentId, isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const el = document.createElement("elevenlabs-convai");
    el.setAttribute("agent-id", agentId);
    el.setAttribute("auto-start", "true");
    el.setAttribute("theme", "dark");

    const mount = document.getElementById("aria-elevenlabs-mount");
    if (mount) {
      mount.innerHTML = "";
      mount.appendChild(el);
    }
  }, [agentId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="aria-overlay" onClick={onClose}>
      <button className="aria-close" onClick={onClose} aria-label="Close">✕</button>
      <div id="aria-elevenlabs-mount" className="aria-widget-center" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
