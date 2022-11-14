import "./App.css";
import React from "react";

const initialState = {
  sessionSetLength: 25,
  sessionCurrentMinutes: 25,
  sessionCurrentSeconds: "00",
  breakLength: 5,
  sessionRunning: false,
  sessionRunningTitle: "Session",
};

//Tasks to do : copy incrementsession to decrement, test everything after session is finished

//reducer function and logic behind

function reducer(state: any, action: any) {
  switch (action.type) {
    //clicked play or stoppebutton, timer is running and counting
    //not sure if combination of case and if conditions is clear
    case "startSessionTimer":
      state.sessionRunningTitle = "Session is running";
      if (
        state.sessionCurrentSeconds === 0 ||
        state.sessionCurrentSeconds === "00"
      ) {
        return {
          ...state,
          sessionCurrentMinutes: state.sessionCurrentMinutes - 1,
          sessionCurrentSeconds: 59,
        };
      } else if (state.sessionCurrentSeconds < 11) {
        return {
          ...state,
          sessionCurrentSeconds:
            "0" + (state.sessionCurrentSeconds - 1).toString(),
        };
      } else {
        return {
          ...state,
          sessionCurrentSeconds: state.sessionCurrentSeconds - 1,
        };
      }

    //setting both sessions, current and set session, if and else condition is needed or case jumps to another case

    case "incrementAllSession":
      if (
        state.sessionRunning === false &&
        state.sessionCurrentSeconds != "00"
      ) {
        return {
          ...state,
          sessionCurrentMinutes: state.sessionCurrentMinutes + 1,
          sessionSetLength: state.sessionCurrentMinutes + 1,
          sessionCurrentSeconds: "00",
        };
      } else if (state.sessionRunning === false) {
        return {
          ...state,
          sessionCurrentMinutes: state.sessionCurrentMinutes + 1,
          sessionSetLength: state.sessionSetLength + 1,
        };
      } else {
        return { ...state };
      }
    case "decrementAllSession":
      if (state.sessionRunning === false) {
        return {
          ...state,
          sessionCurrentMinutes: state.sessionCurrentMinutes - 1,
          sessionSetLength: state.sessionSetLength - 1,
        };
      } else {
        return { ...state };
      }
    //setting breaklengths with sound

    case "incrementBreak":
      if (state.sessionRunning === false && state.breakLength < 500) {
        return { ...state, breakLength: state.breakLength + 1 };
      } else {
        return { ...state };
      }
    case "decrementBreak":
      if (state.sessionRunning === false && state.breakLength > 1) {
        return { ...state, breakLength: state.breakLength - 1 };
      } else {
        return { ...state };
      }
    //start or stop button

    case "startOrStop":
      if (state.sessionRunning) {
        return {
          ...state,
          sessionRunningTitle: "Session stopped",
          sessionRunning: !state.sessionRunning,
        };
      } else {
        return {
          ...state,
          sessionRunning: !state.sessionRunning,
        };
      }

    case "reset":
      return {
        sessionSetLength: 25,
        sessionCurrentMinutes: 25,
        sessionCurrentSeconds: "00",
        breakLength: 5,
        sessionRunning: false,
        sessionRunningTitle: "Session restarted",
      };

    case "sessionFinished":
      return { ...state, sessionRunningTitle: "Session has finished" };

    default:
      return state;
  }
  return {};
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //These two functions means more code, but is recommended
  function incrementAllSession() {
    dispatch({ type: "incrementAllSession" });
  }

  function decrementAllSession() {
    dispatch({ type: "decrementAllSession" });
  }

  //beepSOund to play for break length

  const beepSound = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  React.useEffect(() => {
    if (state.sessionRunning && state.sessionCurrentMinutes >= 0) {
      const mySessionInterval = setInterval(() => {
        dispatch({ type: "startSessionTimer" });
      }, 1000);
      const myBreakInterval = setInterval(() => {
        console.log("beep");
        beepSound.play();
      }, state.breakLength * 1000 * 60);

      return () => {
        clearInterval(myBreakInterval);
        clearInterval(mySessionInterval);
      };
    } else if (state.sessionCurrentMinutes === -1) {
      dispatch({ type: "reset" });
      dispatch({ type: "sessionFinished" });
    }
  }, [state.sessionRunning, state.sessionCurrentMinutes]);

  return (
    <main>
      <h2>25 + 5 Clock</h2>
      <div id="lengths">
        <div id="break-label">
          <div>Session Length</div>
          <div>
            <i
              className="bi bi-arrow-up icon-sm"
              id="break-increment"
              onClick={incrementAllSession}
            ></i>
            <div id="break-length">{state.sessionSetLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="break-decrement"
              onClick={decrementAllSession}
            ></i>
          </div>
        </div>
        <div id="session-label">
          <div>Break Length</div>
          <div>
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
          {state.sessionRunningTitle}
        </div>
        <div className="card-body text-dark">
          <h1 className="card-title" id="time-left">
            {state.sessionCurrentMinutes}:{state.sessionCurrentSeconds}
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
          style={{ fontSize: "2.7em", marginLeft: "0.2em" }}
          onClick={() => dispatch({ type: "reset" })}
        ></i>
      </div>
    </main>
  );
}
