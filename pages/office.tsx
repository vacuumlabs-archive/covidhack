import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changePassword} from '../logic/actions'

const OfficePage = () => {
  const password = useSelector((state) => state.officePassword)
  const dispatch = useDispatch()

  return (
    <div>
      Office, {password}{' '}
      <button onClick={() => dispatch(changePassword('heslo'))}>Zmen heslo</button>
    </div>
  )
}

export default OfficePage
