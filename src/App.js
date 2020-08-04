import React, { useState, useEffect } from "react";
import "./styles.css";

import TimerDisplay from "./TimerDisplay";
import ToolBar from "./ToolBar";
import Controls from "./Controls";

function formatDate(num) {
  return num < 10 ? `0${num}:00` : `${num}:00`;
}
let timer = "";

export default function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState("");
  const [runningSession, setRunningSession] = useState(true);
  const [counting, setCounting] = useState(false);

  function start() {
    if (!counting) {
      startCountdown();
      setCounting(prev => !prev);
    } else {
      clearInterval(timer);
      setCounting(prev => !prev);
    }
  }
  function startCountdown() {
    timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          return 59;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  }
  function handleSession(operation) {
    if (operation === "+") {
      setSessionLength(prevSession =>
        prevSession < 60 ? prevSession + 1 : 60
      );
    } else {
      setSessionLength(prevSession =>
        prevSession === 1 ? 1 : prevSession - 1
      );
    }
  }
  function handleBreak(operation) {
    if (operation === "+") {
      setBreakLength(prevBreak => (prevBreak < 60 ? prevBreak + 1 : 60));
    } else {
      setBreakLength(prevBreak => (prevBreak === 1 ? 1 : prevBreak - 1));
    }
  }
  useEffect(() => {
    if (seconds === 59) {
      setMinutes(prev => {
        if (prev === 0) {
          return 0;
        } else {
          return prev - 1;
        }
      });
    } else if (seconds === 0 && minutes === 0) {
      // TIMER REACHES 00:00
      document.getElementById("beep").play();
      clearInterval(timer);
      // CHANGE MINUTES TO NEW BREAK
      setMinutes(() => {
        if (runningSession) {
          return breakLength;
        } else {
          return sessionLength;
        }
      });
      setRunningSession(prev => !prev);
      // START BREAK TIMER
      startCountdown();
    }
  }, [seconds]);
  useEffect(() => {
    setDisplay(() => formatDate(sessionLength));
    setMinutes(sessionLength);
  }, [sessionLength]);
  function handleReset() {
    clearInterval(timer);
    setMinutes(25);
    setBreakLength(5);
    setSessionLength(25);
    setSeconds(0);
    setRunningSession(true);
    setCounting(false);
    document.getElementById("beep").load();
  }
  return (
    <div className="container">
      <h1>React Pomodoro Clock</h1>
      <TimerDisplay
        runningSession={runningSession}
        minutes={minutes}
        seconds={seconds}
      />
      <br />
      <ToolBar start={start} handleReset={handleReset} />
      <audio
        id="beep"
        src="https://github.com/ezzep66/react-test-pomodoro/raw/master/chime_bell_ding.wav"
      />
      <Controls
        sessionLength={sessionLength}
        handleSession={handleSession}
        breakLength={breakLength}
        handleBreak={handleBreak}
      />
    </div>
  );
}
