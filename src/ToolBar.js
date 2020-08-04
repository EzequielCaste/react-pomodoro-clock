import React from "react";

export default function ToolBar({ start, handleReset }) {
  return (
    <div className="function-buttons">
      <button id="start_stop" onClick={() => start()}>
        Start
      </button>
      <button onClick={handleReset} id="reset">
        Reset
      </button>
    </div>
  );
}
