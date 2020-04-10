require('dotenv').config()
import {GraphQLClient} from 'graphql-request'
import {getSdk} from './graphqlSdk'

// currently intended to be used from server-side only
// but nothing prevents us from using it client-side once user level role exists
export const client = getSdk(
  new GraphQLClient(process.env.GQL_ENDPOINT, {
    // don't send the x-hasura-admin-secret header if we don't have it
    // currently does not matter much, in the future this is how we'll configure the user-role
    headers: process.env.HASURA_ADMIN_SECRET
      ? {'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET}
      : {},
  }),
)
