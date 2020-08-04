import React from "react";

export default function TimerDisplay({
  runningSession,
  minutes,
  seconds,
  display
}) {
  return (
    <div className="display">
      <span id="timer-label">{runningSession ? "Session " : "Break "}</span>
      <h3 id="time-left">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </div>
  );
}
