import React, { useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import uploadFileIcon from '@/assets/icons/upload-file.svg'
import audioFileIcon from '@/assets/icons/audio-file.svg'
import { formatFileSize } from '@/utils/functions/formatFileSize'
import ErrorMessage from '../error-message'
import { convertToWav } from '@/utils/functions/convertToWav'

const FileInput = ({ setAudio, setLoading }) => {
  const [uploadedAudio, setUploadedAudio] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = async (event) => {
    setLoading(true)
    const file = event.target.files[0]
    if (file && file.type.startsWith('audio/')) {
      let wavBlob
      if (!file.type.includes('wav')) {
        wavBlob = await convertToWav(file)
      }

      setError(null)
      setUploadedAudio(file)
      setAudio(wavBlob ?? file)
    } else {
      setUploadedAudio(null)
      setAudio(null)
      setError('Please upload a valid audio file.')
    }
    setLoading(false)
  }

  return (
    <section className={styles.section}>
      <label htmlFor='file-upload' className={styles.fileInput}>
        {uploadedAudio ? (
          <div className={styles.labelContainer}>
            <Image src={audioFileIcon} alt='upload-audio' />
            <div>
              <h4>{uploadedAudio.name}</h4>
              <p>{formatFileSize(uploadedAudio.size)}</p>
            </div>
          </div>
        ) : (
          <div className={styles.labelContainer}>
            <Image src={uploadFileIcon} alt='upload-audio' />
            <h4>Upload an Arabic audio file here</h4>
          </div>
        )}
      </label>
      <input
        id='file-upload'
        type='file'
        accept='audio/*'
        onChange={handleFileUpload}
      />
      {error && <ErrorMessage message={error} />}
    </section>
  )
}

export default FileInput
