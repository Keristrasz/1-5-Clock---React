import "./App.css";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer";

//beepSound to play when break or session finishes

const beepSound = new Audio(
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //These two functions are another method how to pass dispatch into tsx code below

  function incrementSession() {
    dispatch({ type: "incrementSession" });
  }

  function decrementSession() {
    dispatch({ type: "decrementSession" });
  }

  //useEffect for re-rendering every second or sound beep

  useEffect(() => {
    if (state.timerRunning && state.timerCurrentMinutes >= 0) {
      let mySessionInterval = setInterval(() => {
        dispatch({ type: "startTimer" });
        dispatch({ type: "timerColorChange" });
        dispatch({ type: "sessionOrBrake" });
      }, 1000);

      return () => {
        clearInterval(mySessionInterval);
      };
    } else if (state.timerCurrentMinutes === -1) {
      beepSound.play();

      state.sessionThenBreak
        ? dispatch({ type: "sessionFinished" })
        : dispatch({ type: "breakFinished" });
    }
  }, [state.timerRunning, state.timerCurrentMinutes]);

  return (
    <main>
      <h2>1 + 5 beepSound Clock</h2>
      <div id="lengths">
        <div id="break-label">
          <div>Session Length</div>
          <div className="d-flex align-items-center">
            <i
              className="bi bi-arrow-up icon-sm"
              id="break-increment"
              onClick={incrementSession}
            ></i>
            <div id="break-length">{state.sessionLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="break-decrement"
              onClick={decrementSession}
            ></i>
          </div>
        </div>
        <div id="session-label">
          <div>Break Length</div>
          <div className="d-flex align-items-center">
            <i
              className="bi bi-arrow-up icon-sm"
              id="session-increment"
              onClick={() => dispatch({ type: "incrementBreak" })}
            ></i>
            <div id="session-length">{state.breakLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="session-decrement"
              onClick={() => dispatch({ type: "decrementBreak" })}
            ></i>
          </div>
        </div>
      </div>
      <div className="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header" id="timer-label">
          {state.timerTitle}
        </div>
        <div className="card-body text-dark">
          <h1 className="card-title" id="time-left" style={state.timerColor}>
            {state.timerCurrentMinutes}:{state.timerCurrentSeconds}
          </h1>
        </div>
      </div>
      <div>
        <i
          className="bi bi-play-fill icon"
          id="start_stop"
          onClick={() => dispatch({ type: "startOrStop" })}
        ></i>
        <i
          className="bi bi-stop-fill icon"
          id="start_stop"
          onClick={() => dispatch({ type: "startOrStop" })}
        ></i>
        <i
          className="bi bi-arrow-repeat icon"
          id="reset"
          style={{ fontSize: "2.9em", marginLeft: "0.2em" }}
          onClick={() => dispatch({ type: "reset" })}
        ></i>
      </div>
    </main>
  );
}
