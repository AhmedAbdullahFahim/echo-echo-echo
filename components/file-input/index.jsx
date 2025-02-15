import React, { useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import uploadFileIcon from '@/assets/icons/upload-file.svg'
import audioFileIcon from '@/assets/icons/audio-file.svg'
import { formatFileSize } from '@/utils/functions/formatFileSize'

const FileInput = () => {
  const [uploadedAudio, setUploadedAudio] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('audio/')) {
      setUploadedAudio(file)
    } else {
      alert('Please upload a valid audio file.')
    }
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
            <h4>Upload an arabic audio file here</h4>
          </div>
        )}
      </label>
      <input
        id='file-upload'
        type='file'
        accept='audio/*'
        onChange={handleFileUpload}
      />
    </section>
  )
}

export default FileInput
