'use client'
import { useEffect, useState } from 'react'
import AudioRecorder from '@/components/audio-recorder'
import FileInput from '@/components/file-input'
import styles from './page.module.css'
import Loading from '@/components/loading'
import echoIcon from '@/assets/icons/echo.svg'
import Image from 'next/image'
import ErrorMessage from '@/components/error-message'
import { convertToBase64 } from '@/utils/functions/convertToBase64'

const EchoPage = () => {
  const [audioSrc, setAudioSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const callKatib = () => {
    setLoading(true)
    const audioData = audioSrc
    const formdata = new FormData()
    formdata.append('file', audioData)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('https://echo-6sdzv54itq-uc.a.run.app/kateb', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const responseData = JSON.parse(result)
        const wordsArray = responseData.json.words
        if (wordsArray.length > 0) {
          const totalConfidence = wordsArray.reduce(
            (sum, word) => sum + word.confidence,
            0
          )
          const avgConfidence = totalConfidence / wordsArray.length
          if (avgConfidence < 0.5) {
            setError(
              'Failed to generate the echoed electronic result, please record in Arabic!'
            )
            setTimeout(() => {
              setLoading(false)
            }, 300)
            return
          } else {
            setError(null)
          }
        }
        const textArray = wordsArray.map((word) => word.text)
        if (textArray.length > 0) {
          const lastWord = textArray[textArray.length - 1]
          textArray.push(lastWord, lastWord, lastWord)
        }
        setError(null)
        callNatiq(textArray.join(' '))
      })
      .catch((error) => {
        setLoading(false)
        setError('There was an error converting the audio to text')
        console.log('error', error)
      })
  }

  const callNatiq = (text) => {
    setLoading(true)
    const textData = text
    let formdata = { text: textData }
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formdata),
      redirect: 'follow',
    }
    fetch('https://echo-6sdzv54itq-uc.a.run.app/natiq', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const convertedResult = convertToBase64(result.wave)
        playAudio(convertedResult)
        setError(null)
        setLoading(false)
      })

      .catch((error) => {
        setError('There was an error playing the electronic audio')
        console.log('error', error)
        setLoading(false)
      })
  }

  const playAudio = (audioFile) => {
    try {
      const byteCharacters = atob(audioFile)
      const byteNumbers = new Uint8Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const blob = new Blob([byteNumbers], { type: 'audio/mp3' })
      const audioUrl = URL.createObjectURL(blob)
      setResult(audioUrl)
      setError(null)
    } catch (error) {
      setError('Error decoding base64')
      console.error('Error decoding base64:', error)
    }
  }

  return (
    <div className={styles.page}>
      {loading && <Loading />}
      <FileInput setAudio={setAudioSrc} setLoading={setLoading} />
      <AudioRecorder setAudio={setAudioSrc} />
      {(audioSrc || result) && (
        <div className={styles.section}>
          {audioSrc && (
            <div className={styles.audioPlayer}>
              <h5>Your audio</h5>
              <audio
                controls
                src={URL.createObjectURL(audioSrc)}
                className={styles.audio}
              />
            </div>
          )}
          {result && (
            <div className={styles.audioPlayer}>
              <h5 className={styles.gradientText}>Echoed result!</h5>
              <audio autoPlay controls src={result} className={styles.audio}>
                Your browser does not support the audio tag
              </audio>
            </div>
          )}
          {error && <ErrorMessage message={error} />}
        </div>
      )}
      <button onClick={callKatib} disabled={!audioSrc}>
        <Image src={echoIcon} alt='echo' />
        Echo, echo, echo...
      </button>
    </div>
  )
}
export default EchoPage
