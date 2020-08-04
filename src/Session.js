import React from "react";

export default function Session({ session, clickHandler }) {
  return (
    <div id="session-label">
      Session: <span id="session-length">{session}</span> <br />
      <button
        id="session-increment"
        onClick={() => clickHandler("+", "session")}
      >
        +
      </button>
      <button
        id="session-decrement"
        onClick={() => clickHandler("-", "session")}
      >
        -
      </button>
    </div>
  );
}
