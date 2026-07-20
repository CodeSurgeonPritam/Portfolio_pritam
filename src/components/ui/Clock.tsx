"use client";

import { useEffect, useState } from "react";

/** Live local time (IST) — renders a placeholder until mounted to avoid SSR mismatch. */
export default function Clock() {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {time} <span className="text-muted">IST</span>
    </span>
  );
}
