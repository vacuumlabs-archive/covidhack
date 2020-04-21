import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

const Error404 = () => (
  <>
    <Layout isFormPage headerTitle="Stránka neexistuje">
      <div className="container">
        <div className="wrapper">
          <div className="img-wrapper">
            <img src="/images/404.svg" alt="404 error" className="img-error" />
            <img src="/images/reading.svg" alt="reading" />
          </div>
          <h3 className="title">Oops! Zdá sa, že tu nič nie je.</h3>
          <div className="btn-wrapper">
            <Link href="/">
              <a className="btn-link">Prejsť na domovskú stránku</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
    <style jsx>{`
      .container {
        min-height: calc(100vh - 75px - 120px);
        display: flex;
        justify-content: center;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: -79px;
      }
      .img-wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        margin-bottom: 40px;
      }
      .img-error {
        max-width: 426px;
        height: auto;
        position: relative;
        top: 79px;
      }
      .title {
        font-weight: 800;
        font-size: 32px;
        line-height: 32px;
        margin-top: 0;
        margin-bottom: 40px;
      }
      .btn-wrapper {
        display: flex;
        background: #e56a61;
      }
      .btn-wrapper:hover,
      .btn-wrapper:focus {
        background: #b7605c;
        transition: all 0.1s linear;
      }
      .btn-link {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        padding: 16px 32px;
        text-align: center;
        color: #ffffff;
        width: 100%;
        text-decoration: none;
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: #fdfcfc;
      }
    `}</style>
  </>
)

export default Error404
