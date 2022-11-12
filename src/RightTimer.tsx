import './App.css'

export default function RightTimer() {
  return (
    <div id="session-label">
      <div>Session Length</div>
      <div><i className="bi bi-arrow-up icon-sm" id="session-increment"></i>
        <div id="session-length">Number</div>
        <i className="bi bi-arrow-down icon-sm" id="session-decrement"></i></div>
    </div>
  )
}