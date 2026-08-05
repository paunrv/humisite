"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { SignatureEventsSection } from "./SignatureEventsSection";

const SLOT_ID = "humi-signature-events-mount";

export function SignatureEventsMount() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resolve = () => document.getElementById(SLOT_ID);

    setSlot(resolve());

    const observer = new MutationObserver(() => {
      setSlot(resolve());
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!slot) return null;

  return createPortal(<SignatureEventsSection />, slot);
}
