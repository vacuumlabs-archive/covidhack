import React from 'react'
import Layout from '../components/Layout'
import VerificationForm from '../components/VerificationForm'

const Verification = (props) => (
  <Layout isFormPage>
    <div className="container">
      <div className="wrapper">
        <h2 className="title">Registrácia ochrannej známky</h2>
        <VerificationForm query={props.query} />
      </div>
    </div>
    <style jsx>{`
      .wrapper {
        padding-top: 80px;
        padding-bottom: 160px;
      }
      .title {
        font-size: 28px;
        line-height: 38px;
        font-weight: 800;
        text-align: center;
        margin: 0;
      }
    `}</style>
  </Layout>
)

Verification.getInitialProps = ({query}) => {
  return {query}
}

export default Verification
