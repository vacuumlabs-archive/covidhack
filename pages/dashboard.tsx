import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../components/Layout'
import Dashboard from '../components/office/Dashboard'
import {client} from '../utils/gql'
import {ApplicationsQueryQuery} from '../utils/graphqlSdk'

interface Props {
  applications: ApplicationsQueryQuery
}

const OfficePage = (props: Props) => {
  return (
    <Layout>
      <Dashboard {...props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const applications = await client.ApplicationsQuery()
  console.log(applications)

  return {
    props: {
      applications,
    },
  }
}

export default OfficePage
