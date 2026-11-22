import './ConnectionBadges.css'

const CAMERA = {
  off: ['выкл', 'idle'],
  loading: ['включается…', 'pending'],
  on: ['вкл', 'ok'],
}

const SOCKET = {
  closed: ['нет связи', 'idle'],
  connecting: ['подключение…', 'pending'],
  open: ['подключён', 'ok'],
}

function Badge({ name, value, tone }) {
  return (
    <li className={`badge badge--${tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      <span className="badge__name">{name}:</span> {value}
    </li>
  )
}

export default function ConnectionBadges({ cameraState, socketState, callActive }) {
  const [cameraText, cameraTone] = CAMERA[cameraState]
  const [socketText, socketTone] = SOCKET[socketState]

  return (
    <ul className="badges" aria-label="Состояние соединения">
      <Badge name="Камера" value={cameraText} tone={cameraTone} />
      <Badge name="Сервер" value={socketText} tone={socketTone} />
      <Badge
        name="Звонок"
        value={callActive ? 'идёт' : 'нет'}
        tone={callActive ? 'ok' : 'idle'}
      />
    </ul>
  )
}
