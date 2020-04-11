import Document, {Head, Html, Main, NextScript} from 'next/document'
import React from 'react'
import {pageMetaDefaults} from '../utils/constants'

class DocumentWithLang extends Document {
  render() {
    return (
      <Html lang={pageMetaDefaults.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DocumentWithLang
