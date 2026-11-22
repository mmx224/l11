import { useRef, useState } from 'react'
import ConnectionBadges from './components/ConnectionBadges'
import Controls from './components/Controls'
import StatusBar from './components/StatusBar'
import VideoTile from './components/VideoTile'
import { useCamera } from './hooks/useCamera'
import { useInterviewCall } from './hooks/useInterviewCall'
import './App.css'

export default function App() {
  const remoteVideoRef = useRef(null)
  const [status, setStatus] = useState('Включи камеру и подключись к серверу')

  const camera = useCamera(setStatus)
  const call = useInterviewCall({
    streamRef: camera.streamRef,
    remoteVideoRef,
    setStatus,
  })

  function exitRoom() {
    call.leave()
    camera.stop()
    setStatus('Ты вышел из собеседования')
  }

  const remotePlaceholder = call.remoteActive
    ? null
    : call.callActive
      ? 'Соединяемся…'
      : 'Ждём собеседника'

  return (
    <main className="app">
      <header className="app__header">
        <h1>Видеособеседование 1 на 1</h1>
        <ConnectionBadges
          cameraState={camera.state}
          socketState={call.socketState}
          callActive={call.callActive}
        />
      </header>

      <StatusBar status={status} />

      <Controls
        cameraState={camera.state}
        socketState={call.socketState}
        callActive={call.callActive}
        onStartCamera={camera.start}
        onConnect={call.connect}
        onCall={call.startCall}
        onExit={exitRoom}
      />

      <section className="app__videos">
        <VideoTile
          label="Вы"
          videoRef={camera.videoRef}
          placeholder={camera.state === 'on' ? null : 'Камера выключена'}
          muted
          mirrored
        />
        <VideoTile
          label="Собеседник"
          videoRef={remoteVideoRef}
          placeholder={remotePlaceholder}
          controls
        />
      </section>
    </main>
  )
}
