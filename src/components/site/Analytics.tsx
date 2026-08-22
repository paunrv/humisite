"use client";

import { initHumiAnalytics } from "@/lib/analytics";
import { useEffect } from "react";

/** GA4 page views + delegated WhatsApp clicks for Next-rendered routes. */
export function Analytics() {
  useEffect(() => {
    initHumiAnalytics();
  }, []);

  return null;
}
