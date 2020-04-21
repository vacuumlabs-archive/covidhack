import React from 'react'
import {useSelector} from 'react-redux'
import Layout from '../../components/Layout'
import Dashboard from '../../components/office/Dashboard'
import OfficePassword from '../../components/office/OfficePassword'

const OfficePage = () => {
  const password = useSelector((state) => state.officePassword)

  return (
    <Layout headerTitle="Kancelária">
      {!password && <OfficePassword />}
      {password && <Dashboard />}
    </Layout>
  )
}

export default OfficePage
