import './Controls.css'

export default function Controls({
  cameraState,
  socketState,
  callActive,
  onStartCamera,
  onConnect,
  onCall,
  onExit,
}) {
  return (
    <div className="controls">
      <button
        className="btn"
        onClick={onStartCamera}
        disabled={cameraState !== 'off'}
      >
        <span className="btn__step">1</span>
        Включить камеру
      </button>

      <button
        className="btn"
        onClick={onConnect}
        disabled={cameraState !== 'on' || socketState !== 'closed'}
      >
        <span className="btn__step">2</span>
        Подключиться к серверу
      </button>

      <button
        className="btn btn--primary"
        onClick={onCall}
        disabled={cameraState !== 'on' || socketState !== 'open' || callActive}
      >
        <span className="btn__step">3</span>
        Позвонить
      </button>

      <button className="btn btn--danger" onClick={onExit}>
        Выйти
      </button>
    </div>
  )
}
