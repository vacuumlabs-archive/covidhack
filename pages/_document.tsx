import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {pageMetaDefaults} from '../utils/constants'

class DocumentWithLang extends Document {
  render() {
    return (
      <Html lang={pageMetaDefaults.language}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W2N329G');`,
            }}
          />
          <script
            src="https://embed.tawk.to/5e8205c035bcbb0c9aabe544/default"
            charSet="UTF-8"
            crossOrigin="*"
            async
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W2N329G"
              height={0}
              width={0}
              style={{display: 'none', visibility: 'hidden'}}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DocumentWithLang
