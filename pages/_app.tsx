import {AppProps} from 'next/app'
import React from 'react'

function App({Component, pageProps}: AppProps) {
  // redirect to https when running non-dev in browser
  if (!(process.env.NODE_ENV === 'development') && process.browser) {
    const httpTokens = /^http:\/\/(.*)$/.exec(window.location.href)
    if (httpTokens) {
      window.location.replace('https://' + httpTokens[1])
    }
  }
  return <Component {...pageProps} />
}

export default App
