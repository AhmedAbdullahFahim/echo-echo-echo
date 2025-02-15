import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

const About = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>About RDI AI Arabic Voice Echo Service</h1>

      <section className={styles.section}>
        <p>
          The <strong>RDI AI Arabic Voice Echo Service</strong> is a
          cutting-edge platform designed to revolutionize the way we interact
          with Arabic speech using <strong>artificial intelligence</strong>. Our
          mission is to enhance speech processing, accessibility, and voice
          transformation through innovative AI-driven technology.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔹 How It Works</h2>
        <ul className={styles.list}>
          <li>
            <strong>Upload an Arabic audio file</strong> – Select and upload an
            existing Arabic audio file.
          </li>
          <li>
            <strong>Record Arabic speech</strong> – Use your microphone to
            record live Arabic speech.
          </li>
        </ul>
        <p>
          Once the audio is uploaded or recorded, our AI-powered system
          processes the speech and transforms it into a{' '}
          <strong>synthetic electronic voice</strong> while maintaining clarity
          and accuracy.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔹 Unique Echo Effect</h2>
        <p>
          To create a futuristic and immersive experience, the{' '}
          <strong>last spoken word is repeated three times</strong>, adding an
          echo effect. This feature enhances engagement and gives a distinct
          AI-powered feel to the playback.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔹 Key Features</h2>
        <ul className={styles.list}>
          <li>
            ✅ <strong>AI-Powered Speech Synthesis</strong> – Converts natural
            Arabic speech into an electronic voice.
          </li>
          <li>
            ✅ <strong>Real-Time Recording & Processing</strong> – Record your
            Arabic voice and get instant playback.
          </li>
          <li>
            ✅ <strong>File Upload Support</strong> – Easily process
            pre-recorded Arabic audio files.
          </li>
          <li>
            ✅ <strong>Echo Effect on Final Word</strong> – Enhances the
            listening experience.
          </li>
          <li>
            ✅ <strong>User-Friendly Interface</strong> – Simple and intuitive
            design for smooth interaction.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>🔹 Use Cases</h2>
        <ul className={styles.list}>
          <li>
            🔸 <strong>Accessibility Enhancement</strong> – Helping individuals
            with speech difficulties.
          </li>
          <li>
            🔸 <strong>AI Voice Experimentation</strong> – Useful for
            researchers and developers.
          </li>
          <li>
            🔸 <strong>Entertainment & Creativity</strong> – Perfect for content
            creators and musicians.
          </li>
        </ul>
      </section>

      <p className={styles.footerText}>
        🚀{' '}
        <strong>
          Join us in shaping the future of Arabic AI-powered speech technology!{' '}
          <Link href={'/echo'}>Try it now!</Link>
        </strong>
      </p>
    </main>
  )
}

export default About
