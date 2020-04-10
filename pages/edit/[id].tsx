import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import {client} from '../../utils/gql'

const SuccessRegistration = () => {
  return (
    <>
      <Layout isFormPage>
        <div className="container">
          <div className="wrapper">Hura!</div>
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.headers.authorization !== 'topkek') {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return
  }

  const grid = await client.GridQuery({
    id: context.params.id,
  })

  return {
    props: {
      grid,
    },
  }
}

export default SuccessRegistration
