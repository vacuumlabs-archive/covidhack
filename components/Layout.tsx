import Head from 'next/head'
import React from 'react'
import {pageMetaDefaults} from '../utils/constants'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  isLandingPage?: boolean
  isFormPage?: boolean
  pageTitle?: string
  pageDescription?: string
  pageKeywords?: string
}

const Layout = (props: LayoutProps) => (
  <>
    <Head>
      <title>{props.pageTitle || pageMetaDefaults.title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={props.pageDescription || pageMetaDefaults.description} />
      <meta name="keywords" content={props.pageKeywords || pageMetaDefaults.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.pageTitle || pageMetaDefaults.title} />
      <meta
        property="og:description"
        content={props.pageDescription || pageMetaDefaults.description}
      />
      <meta property="og:image" content="/images/og-image.png" />
      <meta property="og:url" content="https://tramatm.com/" />

      <link rel="apple-touch-icon" sizes="180x180" href="/icons/sapple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#db716b" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Header />
    {props.children}
    <style jsx global>{`
      body {
        margin: 0;
        font-family: 'Avenir', Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: normal;
        line-height: normal;
        color: #000000;
        text-align: left;
        background-color: #fff;
        position: relative;
        min-height: 100vh;
        padding-bottom: 114px;
      }
      .container {
        width: 100%;
        max-width: 1090px;
        padding: 0 15px;
        margin: 0 auto;
      }
      * {
        box-sizing: border-box;
      }
      input {
        font-family: 'Avenir', Arial, Helvetica, sans-serif;
      }
      button {
        font-family: 'Avenir', Arial, Helvetica, sans-serif;
      }
      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir-Heavy-05.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
      }
      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir-Roman-12.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir-HeavyOblique-06.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
      }
      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir-LightOblique-08.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
    `}</style>
  </>
)

export default Layout
