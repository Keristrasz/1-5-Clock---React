import './App.css'
import LeftTimer from './LeftTimer.tsx'
import RightTimer from './RightTimer.tsx'
import React from 'react'



function reducer(state, action) {
  switch (action.type) {
    case 'increment'
      return {}
    case 'decrement'
      return {}
    default:
      return state
  }
  return {}
}

export default function App() {
  const [state, dispatch] = React.useReducer (reducer, 25)
  const [session, setSession] = React.useState(25)

  function increment() {
    dispatch({type: 'increment'})
  }

  function decrement() {
    dispatch({type: 'decrement'})
  }
  
  return (
    <main>
      <h2>25 + 5 Clock</h2>
      <div id="lengths">
      <LeftTimer />
      <RightTimer />
      </div>
          <div className="card border-dark mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header" id="timer-label">Session</div>
  <div className="card-body text-dark">
    <h1 className="card-title" id="time-left">{session}</h1>
   
  </div></div>
      <div><i className="bi bi-play-fill icon" id="start_stop"></i><i className="bi bi-stop-fill icon"  id="start_stop"></i><i className="bi bi-arrow-repeat icon" id="reset" style={{fontSize: "2.7em", marginLeft:"0.2em"}}></i></div>
  

    </main>
  )
}