import {GetServerSideProps} from 'next'
import React from 'react'
import LabDashboard from '../components/lab/Dashboard'
import Layout from '../components/Layout'
import {allowAccessFor} from '../utils/auth'
import {client} from '../utils/gql'
import {GridsQueryQuery} from '../utils/graphqlSdk'

interface Props {
  grids: GridsQueryQuery
}

const Lab = (props: Props) => {
  return (
    <Layout headerTitle="Laboratórium">
      <LabDashboard {...props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  if (!allowAccessFor(context.req.headers.authorization, ['kancelaria'])) {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return {props: {grids: {grid: []}}}
  }

  const grids = await client.GridsQuery()

  return {
    props: {
      grids,
    },
  }
}

export default Lab
