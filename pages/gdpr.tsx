import Link from 'next/link'
import React from 'react'
import GDPRList from '../components/GDPR'
import Layout from '../components/Layout'

const GDPR = () => (
  <>
    <Layout isLandingPage>
      <div className="container">
        <img src="/images/ice_cream.svg" alt="ice-cream" className="img-ice-cream" />
        <div className="wrapper">
          <h3 className="title">Ako na našom portáli pristupujeme k ochrane osobných údajov</h3>
          <GDPRList />
          <div className="link-wrapper">
            <Link href="/cookies">
              <a className="link">Prečítajte si viac o využívaní súborov cookie</a>
            </Link>
          </div>
        </div>
        <div className="img-wrapper">
          <img src="/images/dog.svg" alt="dog" className="img-dog" />
        </div>
      </div>
    </Layout>
    <style jsx>{`
      .wrapper {
        padding: 80px 0 160px;
      }
      .title {
        font-weight: 800;
        font-size: 26px;;
        line-height: 38px;
        max-width: 560px;
        margin: 0 auto;
        text-align: center;
      }
      .link-wrapper {
        text-align: center;
      }
      .link {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        color: #e56a61;
      }
      .link:hover {
        text-decoration: none;
      }
      .img-ice-cream {
        position: absolute;
        max-width: 170px;
        height: auto;
        right: -268px;
        top: 476px;
      }
      .img-dog {
        position: absolute;
        max-width: 196px;
        height: auto;
        left: -294px;
        bottom: 890px;
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: #fdfcfc;
      }
      .container {
        max-width: 670px;
        position: relative;
      }
    `}</style>
  </>
)

export default GDPR
