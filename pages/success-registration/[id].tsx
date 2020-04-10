import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import SuccessInfo from '../../components/SuccessInfo'
import {client} from '../../utils/gql'
import {
  RegistrationRequestSuccessQueryQuery,
  VerificationRequestCategoryQueryQuery,
} from '../../utils/graphqlSdk'

const SuccessRegistration = (
  props: RegistrationRequestSuccessQueryQuery['registration_request_by_pk'] &
    VerificationRequestCategoryQueryQuery['verification_request_by_pk'],
) => {
  return (
    <>
      <Layout isFormPage>
        <div className="container">
          <div className="wrapper">
            <img src="/images/plant.svg" alt="plant" className="img" />
            <SuccessInfo
              title={`${
                props.category === 'international'
                  ? 'Vaša žiadosť bola odoslaná!'
                  : 'Vaša objednávka bola odoslaná!'
              }`}
              subtitle={`${
                props.category === 'international'
                  ? 'Najneskôr nasledujúci pracovný deň Vás s informáciami o ďalšom postupe kontaktuje náš právnik.'
                  : `Na adresu <span><i>${props.contact_email}</i></span> sme Vám odoslali informácie o ďalšom postupe. Prosím, nasledujte ďalšie kroky z emailu.`
              }`}
              note={`${props.category === 'international' ? '' : 'Nedostali ste email?'}`}
              href=""
              link={`${
                props.category === 'international' ? '' : 'Kliknite sem pre odoslanie znova.'
              }`}
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const registration = await client.RegistrationRequestSuccessQuery({
    id: context.params.id,
  })

  const verification = await client.VerificationRequestCategoryQuery({
    id: registration.registration_request_by_pk.verification_request_id,
  })

  return {
    props: {
      ...registration.registration_request_by_pk,
      ...verification.verification_request_by_pk,
    },
  }
}

export default SuccessRegistration
