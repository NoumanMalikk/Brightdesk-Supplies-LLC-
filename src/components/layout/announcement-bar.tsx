"use client";

import { useEffect, useState } from "react";
import { storeConfig } from "@/data/store-config";
import { Pause, Play } from "lucide-react";

export function AnnouncementBar() {
  const messages = storeConfig.announcementMessages;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || messages.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, messages.length]);

  return (
    <div className="border-b border-border-stone bg-blueprint-ink text-paper-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm md:px-6">
        <p className="flex-1 text-center" aria-live="polite">
          {messages[index]}
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-white/10"
          aria-label={paused ? "Play announcement rotation" : "Pause announcement rotation"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
