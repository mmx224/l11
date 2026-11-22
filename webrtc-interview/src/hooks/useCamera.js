import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Камера и микрофон.
 * state: 'off' | 'loading' | 'on'
 */
export function useCamera(setStatus) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const requestRef = useRef(null)
  const [state, setState] = useState('off')

  useEffect(() => {
    return () => {
      requestRef.current = null
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  const start = useCallback(async () => {
    if (streamRef.current || requestRef.current) return

    const request = {}
    requestRef.current = request
    setState('loading')

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Камера доступна только через HTTPS или localhost')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      if (requestRef.current !== request) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      streamRef.current = stream
      videoRef.current.srcObject = stream
      setState('on')
      setStatus('Камера и микрофон включены')
    } catch (error) {
      if (requestRef.current === request) {
        setState('off')
        const reason = error.name === 'NotAllowedError'
          ? 'Разреши доступ к камере и микрофону в браузере'
          : error.name === 'NotFoundError'
            ? 'Камера или микрофон не найдены'
            : error.message
        setStatus(`Не удалось включить камеру или микрофон. ${reason}`)
      }
    } finally {
      if (requestRef.current === request) {
        requestRef.current = null
      }
    }
  }, [setStatus])

  const stop = useCallback(() => {
    requestRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setState('off')
  }, [])

  return { videoRef, streamRef, state, start, stop }
}
