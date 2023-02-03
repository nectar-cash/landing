import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kinetic</title>
        <meta name="description" content="Kinetic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.logo}>Kinetic</h1>
      </main>
    </>
  )
}
