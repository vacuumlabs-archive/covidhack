import React from 'react'
import {Datagrid, DateField, List, TextField} from 'react-admin'

const VerificationRequestList = (props) => (
  <List {...props} sort={{field: 'created_at', order: 'DESC'}}>
    <Datagrid rowClick="show">
      <DateField source="created_at" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="regional_validity" />
      <TextField source="type" />
      <TextField source="value" />
      <TextField source="service_description" />
    </Datagrid>
  </List>
)

export default VerificationRequestList
