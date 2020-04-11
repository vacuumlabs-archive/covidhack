import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../components/Layout'
import Dashboard from '../components/office/Dashboard'
import {decrypt, encrypt} from '../logic/crypto'
import {client} from '../utils/gql'
import {ApplicationsQueryQuery} from '../utils/graphqlSdk'

interface Props {
  applications: ApplicationsQueryQuery
}

const tryCrypto = async () => {
  const enc = await encrypt('toto je encryptnute', 'pass')
  console.log('testing crypto', await decrypt(enc, 'pass'))
}

const OfficePage = (props: Props) => {
  if (typeof window !== 'undefined') {
    tryCrypto()
  }

  return (
    <Layout>
      <Dashboard {...props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const applications = await client.ApplicationsQuery()

  return {
    props: {
      applications,
    },
  }
}

export default OfficePage
