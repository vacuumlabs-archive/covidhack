import React from 'react'
import Layout from '../components/Layout'
import TermsAndConditionsList from '../components/TermsAndConditionsList'

const TermsAndConditions = () => (
  <>
    <Layout isLandingPage>
      <div className="container">
        <img src="/images/zombieing.svg" alt="zombieing" className="img" />
        <div className="wrapper">
          <div className="header">
            <h3 className="title">Všeobecné obchodné podmienky</h3>
            <p className="subtitle">
              Písomné zmluvné podmienky podpíšete až po tom, čo Vás kontaktuje právnik a spoločne
              dohodnete ďalší postup a všetky parametre služby, ktorú ste si vybrali. Tieto písomné
              zmluvné podmienky budú v zhode s informáciami poskytnutými na našej Internetovej
              adrese a pri jednotlivých Službách. Dovtedy sú podmienky pre použitie našich stránok
              nasledujúce.
            </p>
          </div>
          <TermsAndConditionsList />
        </div>
      </div>
    </Layout>
    <style jsx>{`
      .wrapper {
        padding: 80px 0 160px;
        max-width: 660px;
        margin: 0 auto;
      }
      .header {
        text-align: center;
        margin-bottom: 64px;
      }
      .title {
        font-weight: 800;
        font-size: 26px;
        line-height: 38px;
        margin-top: 0;
        margin-bottom: 24px;
      }
      .subtitle {
        font-size: 16px;
        line-height: 28px;
        font-style: italic;
        margin: 0;
      }
      .img {
        position: absolute;
        max-width: 170px;
        height: auto;
        top: 590px;
        right: -285px;
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: #fdfcfc;
      }
      .container {
        max-width: 690px;
        position: relative;
      }
    `}</style>
  </>
)

export default TermsAndConditions
