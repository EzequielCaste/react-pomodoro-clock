import React from "react";

export default function ToolBar({ start }) {
  return (
    <div>
      <button onClick={start}> Start </button>
      <button> Restart </button>
      <button> Mute </button>
      <button> Reset </button>
    </div>
  );
}
