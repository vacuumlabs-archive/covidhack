import React from 'react'
import Banner from '../components/Banner'
import CardList from '../components/CardList'
import FAQList from '../components/FAQList'
import Intro from '../components/Intro'
import Layout from '../components/Layout'
import StepList from '../components/StepList'
import Testimonial from '../components/Testimonial'
import CookieBanner from '../components/CookieBanner'

const Home = () => {
  return (
    <>
      <Layout isLandingPage>
        <Banner />
        <Intro />
        <CardList />
        <StepList />
        <Testimonial />
        <FAQList />
      </Layout>
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

export default Home
