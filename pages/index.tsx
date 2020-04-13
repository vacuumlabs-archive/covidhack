import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../components/Layout'
import {allowAccessFor} from '../utils/auth'

const Home = () => {
  return (
    <>
      <Layout isLandingPage>Prosím prejdite do sekcie "Kancelária" alebo "Laboratórium".</Layout>
      {/* temporary */}
      {/*
      <div className="cookie-wrapper">
        <CookieBanner />
      </div>
      <style jsx>{`
        .cookie-wrapper {
          position: absolute;
          bottom: 64px;
          left: 64px;
        }
      `}</style> */}
      <style jsx global>{`
        body {
          background-color: #fdfcfc;
        }
      `}</style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!allowAccessFor(context.req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return {props: {}}
  }
  return {props: {}}
}

export default Home
