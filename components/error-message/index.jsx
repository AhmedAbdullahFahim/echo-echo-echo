import React from 'react'
import errorIcon from '@/assets/icons/error.svg'
import styles from './index.module.css'
import Image from 'next/image'

const ErrorMessage = ({ message }) => {
  if (message)
    return (
      <div className={styles.container}>
        <Image src={errorIcon} alt='error' />
        <h3>{message}</h3>
      </div>
    )
}

export default ErrorMessage
