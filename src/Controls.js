import React from "react";
import Session from "./Session";
import Break from "./Break";

export default function Controls({
  sessionLength,
  handleSession,
  breakLength,
  handleBreak
}) {
  return (
    <div className="controls">
      <Session session={sessionLength} clickHandler={handleSession} />
      <Break pause={breakLength} clickHandler={handleBreak} />
    </div>
  );
}
