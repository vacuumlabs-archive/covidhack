import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Layout from '../components/Layout'
import OfficePassword from '../components/office/OfficePassword'
import {changePassword} from '../logic/actions'

const OfficePage = () => {
  const password = useSelector((state) => state.officePassword)
  const dispatch = useDispatch()

  return (
    <Layout>
      {!password && <OfficePassword />}
      {password && (
        <div>
          Office, {password}{' '}
          <button onClick={() => dispatch(changePassword('heslo'))}>Zmen heslo</button>
        </div>
      )}
    </Layout>
  )
}

export default OfficePage
