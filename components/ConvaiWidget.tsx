"use client";

import { useEffect } from "react";

/**
 * ElevenLabs Conversational AI embedded widget.
 * Renders the floating voice-chat bubble that lets visitors talk to
 * Captain Shawn's AI booking agent right from the page.
 */
export default function ConvaiWidget() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[data-convai-widget="1"]'
    ) as HTMLScriptElement | null;
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    s.async = true;
    s.type = "text/javascript";
    s.setAttribute("data-convai-widget", "1");
    document.body.appendChild(s);
  }, []);

  return (
    // @ts-expect-error - custom element from the embed script
    <elevenlabs-convai agent-id="agent_3801kpbys6vheqg90zvb1rtsj7h3"></elevenlabs-convai>
  );
}
