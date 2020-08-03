import React, { useState, useEffect } from "react";
import "./styles.css";
import Session from "./Session";
import Break from "./Break";

function formatDate(num) {
  return num < 10 ? `0${num}:00` : `${num}:00`;
}
let timer = "";

export default function App() {
  const [sessionLength, setSessionLength] = useState(2);
  const [breakLength, setBreakLength] = useState(3);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState("");
  const [runningSession, setRunning] = useState(true);

  function startCountdown() {
    timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          return 15;
        } else {
          return prev - 1;
        }
      });
    }, 300);
  }
  function handleSession(operation) {
    if (operation === "+") {
      setSessionLength(prevSession => prevSession + 1);
    } else {
      setSessionLength(prevSession =>
        prevSession === 1 ? 1 : prevSession - 1
      );
    }
  }
  function handleBreak(operation) {
    if (operation === "+") {
      setBreakLength(prevBreak => prevBreak + 1);
    } else {
      setBreakLength(prevBreak => (prevBreak === 1 ? 1 : prevBreak - 1));
    }
  }

  useEffect(() => {
    if (seconds === 15) {
      setMinutes(prev => {
        if (prev === 0) {
          return 0;
        } else {
          return prev - 1;
        }
      });
    } else if (seconds === 0 && minutes === 0) {
      //console.log("end 1 ", timer);
      clearInterval(timer);

      // CHANGE MINUTES TO NEW BREAK
      setMinutes(() => {
        if (runningSession) {
          return breakLength;
        } else {
          return sessionLength;
        }
      });
      setRunning(prev => !prev);
      // START BREAK TIMER
      startCountdown();
    }
  }, [seconds]);
  useEffect(() => {
    setDisplay(() => formatDate(sessionLength));
    setMinutes(sessionLength);
  }, [sessionLength]);

  return (
    <>
      <h1>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <button onClick={() => startCountdown()}>Start</button>
      <Session session={sessionLength} clickHandler={handleSession} />
      <Break pause={breakLength} clickHandler={handleBreak} />
    </>
  );
}
