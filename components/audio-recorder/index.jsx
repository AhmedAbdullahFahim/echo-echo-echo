'use client'
import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.css'
import micIcon from '@/assets/icons/mic-icon.svg'
import pauseIcon from '@/assets/icons/pause.svg'
import resumeIcon from '@/assets/icons/play.svg'
import checkIcon from '@/assets/icons/check.svg'
import crossIcon from '@/assets/icons/cross.svg'
import Image from 'next/image'
import { convertToWav } from '@/utils/functions/convertToWav'
import ErrorMessage from '../error-message'

const AudioRecorder = ({ setAudio }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const [time, setTime] = useState(0)

  const hours = Math.floor(time / 360000)
  const minutes = Math.floor((time % 360000) / 6000)
  const seconds = Math.floor((time % 6000) / 100)
  const milliseconds = time % 100

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        })
        const wavBlob = await convertToWav(audioBlob)
        setAudio(wavBlob)
        audioChunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setError(null)
      setIsRecording(true)
      setIsPaused(false)
    } catch (err) {
      setError('Error accessing microphone', err)
      console.error('Error accessing microphone:', err)
    }
  }

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
    }
  }

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
    }
  }

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      setTime(0)

      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop())
    }
  }

  const resetRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setTime(0)
  }

  useEffect(() => {
    let intervalId
    if (isRecording && !isPaused) {
      intervalId = setInterval(() => setTime(time + 1), 10)
    }
    return () => clearInterval(intervalId)
  }, [isRecording, time, isPaused])

  return (
    <section
      className={`${styles.section} ${
        isRecording || isPaused ? styles.recordingBackground : ''
      }`}
    >
      {!isRecording && !isPaused ? (
        <div className={styles.startRecording}>
          <button onClick={startRecording}>
            <Image src={micIcon} alt='start' />
          </button>
          <h4>Start recording something in Arabic!</h4>
        </div>
      ) : (
        <div className={styles.recorder}>
          <div className={styles.rec}>
            <span className={styles.recording}></span>
            <p>REC</p>
          </div>
          <div className={styles.recorderControls}>
            {isRecording ? (
              isPaused ? (
                <button onClick={resumeRecording}>
                  <Image src={resumeIcon} alt='resume' />
                </button>
              ) : (
                <button onClick={pauseRecording}>
                  <Image src={pauseIcon} alt='pause' />
                </button>
              )
            ) : null}
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className={styles.button}
            >
              <Image src={checkIcon} alt='success' />
            </button>
            <button onClick={resetRecording} className={styles.button}>
              <Image src={crossIcon} alt='reset' />
            </button>
          </div>
          <p className={styles.timer}>
            {hours}:{minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}:
            {milliseconds.toString().padStart(2, '0')}
          </p>
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </section>
  )
}

export default AudioRecorder
