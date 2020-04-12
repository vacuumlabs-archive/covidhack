import {GetServerSideProps} from 'next'
import React from 'react'
import Layout from '../components/Layout'
import {client} from '../utils/gql'
import {GridsQuery} from '../utils/graphqlSdk'
import LabDashboard from '../components/lab/Dashboard'

interface Props {
  grids: GridsQuery
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
