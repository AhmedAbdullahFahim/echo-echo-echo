import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <main className={styles.container}>
      <h2>
        Welcome to RDI AI Arabic Voice Echo, a revolutionary service designed to
        transform the way we interact with Arabic speech using advanced AI
        technology. Our platform allows users to upload an Arabic audio file or
        record their voice in real-time, after which our system processes the
        audio and plays it back with a unique electronic voice transformation.
        To enhance the experience, the last spoken word is echoed three times,
        creating a futuristic and immersive effect. Whether you're experimenting
        with speech synthesis, enhancing accessibility, or exploring AI-powered
        voice modulation, this service is built to push the boundaries of Arabic
        audio technology.
      </h2>
      <Link href='/echo'>
        🚀 Try it now and experience the future of AI-powered Arabic speech!
      </Link>
    </main>
  )
}

export default Home
