import React from 'react'
import {Datagrid, DateField, List, TextField} from 'react-admin'
import {ServiceField} from './ServiceField'

const RegistrationRequestList = (props) => (
  <List {...props} sort={{field: 'created_at', order: 'DESC'}}>
    <Datagrid rowClick="show">
      <TextField source="verification_request_id" />
      <DateField source="created_at" />
      <TextField source="contact_first_name" />
      <TextField source="contact_last_name" />
      <ServiceField source="services" />
    </Datagrid>
  </List>
)

export default RegistrationRequestList
