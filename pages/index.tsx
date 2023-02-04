import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import twitterIcon from '../assets/twitter.svg'
import { useState } from 'react'
import PocketBase from 'pocketbase'

const pbURL = process.env.NODE_ENV === 'production' ? 'https://base.form.live' : 'http://127.0.0.1:8090'
const pb = new PocketBase(pbURL)

export default function Home() {
  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)

  const [shake, setShake] = useState(false)
  const animate = () => {
    setShake(true)
    setTimeout(() => setShake(false), 1000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameValue !== '') {
      animate()
      return
    }
    if (emailValue === '' || emailValue.indexOf('.') === -1) {
      animate()
      return
    }
    let res = await pb.collection('nectar_emails').create({ email: emailValue })
    if (res.created) {
      setSubscribeSuccess(true)
    }
  }

  return (
    <>
      <Head>
        <title>Nectar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta property="og:title" content="Nectar" />
        <meta name="twitter:title" content="Nectar" />
        <meta property="og:site_name" content="Nectar" />
        <meta
          name="description"
          content="Returning MEV to users. Public Beta this summer. Enter the waiting list to get your MEV back."
        />
        <meta
          property="og:description"
          content="Returning MEV to users. Public Beta this summer. Enter the waiting list to get your MEV back."
        />
        <meta
          name="twitter:description"
          content="Returning MEV to users. Public Beta this summer. Enter the waiting list to get your MEV back."
        />
        <meta property="og:url" content="https://nectar.cash/" />
        <meta name="twitter:url" content="https://nectar.cash/" />
        <meta property="og:type" content="website" />
        <meta name="author" content="Nectar" />
        <meta name="twitter:site" content="@nectar_cash" />
        <meta name="twitter:creator" content="@nectar_cash" />
        <meta property="og:image" content="/social-share.png" />
        <meta name="twitter:image" content="/social-share.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="flex flex-col">
          <h1 className={styles.logo}>Nectar</h1>
          <p className="text-2xl font-semibold mt-4 mb-12">Returning MEV to users.</p>

          <form
            onSubmit={handleSubmit}
            className="text-[#1B1B1B] bg-[#EFEAE7] p-4 md:p-6 rounded-2xl -mx-4 md:-mx-6 max-w-[400px]"
          >
            <p className="mb-4 md:mb-6 text-lg md:text-xl">
              Public Beta this summer. Enter the waiting list to get your MEV back.
            </p>
            {subscribeSuccess ? (
              <>
                <p className="mt-16 text-xl mb-16">Thanks! You&lsquo;re on the list.</p>
              </>
            ) : (
              <>
                <p className="hidden">
                  <label>
                    Don’t fill this out if you’re human:{' '}
                    <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} type="text" name="name" />
                  </label>
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className={`bg-white block w-full px-4 py-3 rounded-lg text-xl outline-none ${
                    shake ? styles.shake : ''
                  }`}
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="block cursor-pointer w-full px-4 py-3 mt-4 mb-6 rounded-lg font-semibold text-xl bg-[#325444] text-[#CFFC0D]"
                />
              </>
            )}
            <hr className="border-0 border-t-[1px] border-stone-300 mb-6" />
            <a
              className="w-full flex justify-center items-center gap-4 text-xl font-semibold mb-2 text-center text-[#325444]"
              href="https://twitter.com/nectar_cash"
            >
              <Image src={twitterIcon} alt="" />
              Follow Nectar on Twitter
            </a>
          </form>
        </div>
      </main>
    </>
  )
}
