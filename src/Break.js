import React from "react";

export default function Break({ pause, clickHandler }) {
  return (
    <div id="break-label">
      Break: <span id="break-length">{pause}</span> <br />
      <button id="break-increment" onClick={() => clickHandler("+")}>
        +
      </button>
      <button id="break-decrement" onClick={() => clickHandler("-")}>
        -
      </button>
    </div>
  );
}
