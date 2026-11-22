import './VideoTile.css'

export default function VideoTile({
  label,
  videoRef,
  placeholder,
  muted = false,
  controls = false,
  mirrored = false,
}) {
  return (
    <figure className="tile">
      <video
        ref={videoRef}
        className={mirrored ? 'tile__video tile__video--mirrored' : 'tile__video'}
        autoPlay
        playsInline
        muted={muted}
        controls={controls}
        aria-label={label}
      />
      <figcaption className="tile__label">{label}</figcaption>
      {placeholder && <div className="tile__placeholder">{placeholder}</div>}
    </figure>
  )
}
