// needs to be a dynamic import with no-ssr, since react-admin breaks when rendered server-side
// this should also ensure that clients visiting the page don't need to load any of react-admin dependencies (i.e. material-ui)
import hasuraDataProvider from 'ra-data-hasura'
import React from 'react'
import {Admin, fetchUtils, Resource} from 'react-admin'
import authProvider from '../../utils/authProvider'
import RegistrationRequestList from './RegistrationRequestList'
import RegistrationRequestShow from './RegistrationRequestShow'
import VerificationRequestList from './VerificationRequestList'
import VerificationRequestShow from './VerificationRequestShow'

const httpClient = (url, options = {}) => {
  if (!options['headers']) {
    options['headers'] = new Headers({Accept: 'application/json'})
  }
  // add your own headers here
  options['headers'].set('X-Hasura-Admin-Secret', localStorage.getItem('admin-header'))
  return fetchUtils.fetchJson(url, options)
}

const App = () => (
  <Admin
    dataProvider={hasuraDataProvider('https://verdikto-hasura.herokuapp.com', httpClient)}
    authProvider={authProvider}
  >
    <Resource
      name="verification_request"
      list={VerificationRequestList}
      show={VerificationRequestShow}
    />
    <Resource
      name="registration_request"
      list={RegistrationRequestList}
      show={RegistrationRequestShow}
    />
  </Admin>
)

export default App
