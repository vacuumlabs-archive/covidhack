import {GetServerSideProps} from 'next'
import React from 'react'
import LabDashboard from '../components/lab/Dashboard'
import Layout from '../components/Layout'
import {client} from '../utils/gql'
import {GridsQueryQuery} from '../utils/graphqlSdk'

interface Props {
  grids: GridsQueryQuery
}

const Lab = (props: Props) => {
  return (
    <Layout>
      <LabDashboard {...props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const grids = await client.GridsQuery()

  return {
    props: {
      grids,
    },
  }
}

export default Lab
