import './App.css'

export default function LeftTimer() {
  return (
    <div id="break-label">
      <div>Break Length</div>
      <div><i className="bi bi-arrow-up icon-sm" id="break-increment"></i>
        <div id="break-length">Number</div>
        <i className="bi bi-arrow-down icon-sm" id="break-decrement"></i>
      </div>
          
    </div>
  )
}