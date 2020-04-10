import React from 'react'
import Layout from '../components/Layout'
import SuccessInfo from '../components/SuccessInfo'

const SuccessVerification = () => (
  <>
    <Layout isFormPage>
      <div className="container">
        <div className="wrapper">
          <img src="/images/plant.svg" alt="plant" className="img" />
          <SuccessInfo
            title="Vaša žiadosť o overenie bola prijatá!"
            subtitle="Najneskôr do 48 hodín Vás prostredníctvom emailu informujeme, či je známka vhodná na registráciu."
            note="Trama je súčasťou inovačnej platformy Sparring. "
            href="https://sparring.io"
            link="Dozvedieť sa viac"
          />
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
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      .img {
        width: 100%;
        max-width: 200px;
        height: 187px;
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: #fdfcfc;
      }
    `}</style>
  </>
)

export default SuccessVerification
