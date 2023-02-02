interface InitialState {
  sessionLength: number;
  timerCurrentMinutes: any;
  timerCurrentSeconds: any;
  breakLength: number;
  timerRunning: boolean;
  sessionThenBreak: boolean;
  timerTitle: string;
  timerColor: { color: string };
}

export const initialState: InitialState = {
  sessionLength: 1,
  timerCurrentMinutes: 1,
  timerCurrentSeconds: "00",
  breakLength: 5,
  timerRunning: false,
  sessionThenBreak: true,
  timerTitle: "Session",
  timerColor: { color: "black" },
};

type Action =
  | { type: "startTimer" }
  | { type: "incrementSession" }
  | { type: "decrementSession" }
  | { type: "incrementBreak" }
  | { type: "decrementBreak" }
  | { type: "startOrStop" }
  | { type: "timerColorChange" }
  | { type: "sessionOrBrake" }
  | { type: "reset" }
  | { type: "sessionFinished" }
  | { type: "breakFinished" };

//reducer function and logic behind

export function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    //Handling all timer operations without using any package, or date functions.

    //for clicking Play/Stop Button -> timer is running and counting

    case "startTimer":
      if (state.timerCurrentSeconds === 0 || state.timerCurrentSeconds === "00") {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes - 1,
          timerCurrentSeconds: 59,
        };
      } else if (state.timerCurrentSeconds < 11) {
        return {
          ...state,
          timerCurrentSeconds: "0" + (state.timerCurrentSeconds - 1).toString(),
        };
      } else {
        return {
          ...state,
          timerCurrentSeconds: state.timerCurrentSeconds - 1,
        };
      }

    case "incrementSession":
      if (state.sessionThenBreak) {
        if (state.timerRunning === false && state.timerCurrentSeconds != "00") {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 2,
            sessionLength: state.sessionLength + 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 1,
            sessionLength: state.sessionLength + 1,
          };
        } else {
          return { ...state };
        }
      } else {
        if (state.timerRunning === false) {
          return {
            ...state,
            sessionLength: state.sessionLength + 1,
          };
        } else {
          return { ...state };
        }
      }

    //increment, decrement session or break length

    case "decrementSession":
      if (state.sessionThenBreak) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.sessionLength > 1
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes,
            sessionLength: state.sessionLength - 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false && state.sessionLength > 1) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes - 1,
            sessionLength: state.sessionLength - 1,
          };
        } else {
          return { ...state };
        }
      } else {
        if (state.timerRunning === false && state.sessionLength > 1) {
          return {
            ...state,
            sessionLength: state.sessionLength - 1,
          };
        } else {
          return { ...state };
        }
      }

    case "incrementBreak":
      if (state.sessionThenBreak === false) {
        if (state.timerRunning === false && state.timerCurrentSeconds != "00") {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 2,
            breakLength: state.breakLength + 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 1,
            breakLength: state.breakLength + 1,
          };
        } else {
          return { ...state };
        }
      } else {
        if (state.timerRunning === false) {
          return {
            ...state,
            breakLength: state.breakLength + 1,
          };
        } else {
          return { ...state };
        }
      }
    case "decrementBreak":
      if (state.sessionThenBreak === false) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.breakLength > 1
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes,
            breakLength: state.breakLength - 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false && state.breakLength > 1) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes - 1,
            breakLength: state.breakLength - 1,
          };
        } else {
          return { ...state };
        }
      } else {
        if (state.timerRunning === false && state.breakLength > 1) {
          return {
            ...state,
            breakLength: state.breakLength - 1,
          };
        } else {
          return { ...state };
        }
      }

    //start or stop button for timer to run or stop

    case "startOrStop":
      return {
        ...state,
        timerTitle: state.timerRunning ? "Timer stopped" : "Timer is starting...",
        timerRunning: !state.timerRunning,
      };

    //timer color changes, if timer is below 1 minute

    case "timerColorChange":
      return {
        ...state,
        timerColor: { color: state.timerCurrentMinutes === 0 ? "red" : "black" },
      };

    //timer title changes depends if its session or break

    case "sessionOrBrake":
      return {
        ...state,
        timerTitle: state.sessionThenBreak ? "Session is running" : "Break is running",
      };

    //reset to change everything to initialState

    case "reset":
      return initialState;

    //if session or break is finished -> change to break or session

    case "sessionFinished":
      return {
        ...state,
        timerTitle: "Break is running",
        timerCurrentMinutes: state.breakLength - 1,
        sessionThenBreak: false,
      };

    case "breakFinished":
      return {
        ...state,
        timerTitle: "Session is running",
        timerCurrentMinutes: state.sessionLength - 1,
        sessionThenBreak: true,
      };

    default:
      return state;
  }
}
