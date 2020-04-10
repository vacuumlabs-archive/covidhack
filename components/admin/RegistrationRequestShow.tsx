import IconButton from '@material-ui/core/Button'
import DescriptionIcon from '@material-ui/icons/Description'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import React, {useCallback} from 'react'
import {
  Datagrid,
  DateField,
  EmailField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import {GroupedServiceField} from './ServiceField'
import {fetchFile} from '../../utils/frontendHelper'


const RegistrationRequestShowActions = ({data}) => {
  const downloadFile = (key) => {
    fetchFile(
      '/api/download',
      {
        'X-Hasura-Admin-Secret': localStorage.getItem('admin-header'),
      },
      {key: key},
    )
  }
  const handleDelegationDownload = useCallback(() => {
    downloadFile(`upload/generated/${data.id}_delegation.pdf`)
  }, [data])
  const handleInvoiceDownload = useCallback(() => {
    downloadFile(`upload/generated/${data.id}_invoice.pdf`)
  }, [data])

  return (
    <TopToolbar>
      {data.status == 'documents-sent' ? (
        <>
          <IconButton color="secondary" onClick={handleInvoiceDownload}>
            <DescriptionIcon />
            &nbsp; Download invoice
          </IconButton>
          <IconButton color="secondary" onClick={handleDelegationDownload}>
            <DescriptionOutlinedIcon />
            &nbsp; Download delegation
          </IconButton>
        </>
      ) : (
        <></>
      )}
    </TopToolbar>
  )
}

const RegistrationRequestShow = (props) => (
  <Show {...props} actions={<RegistrationRequestShowActions {...props} />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="verification_request_id" />
      <ReferenceManyField
        source="verification_request_id"
        label="Verification Request"
        reference="verification_request"
        target="id"
        link="show"
      >
        <Datagrid>
          <TextField source="first_name" />
          <TextField source="last_name" />
          <TextField source="phone" />
          <EmailField source="email" />
          <TextField source="regional_validity" />
          <TextField source="international_countries_validity" />
          <TextField source="type" />
          <TextField source="value" />
          <TextField source="service_description" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
        </Datagrid>
      </ReferenceManyField>
      <TextField source="contact_first_name" />
      <TextField source="contact_last_name" />
      <TextField source="contact_phone" />
      <EmailField source="contact_email" />
      <TextField source="lawyer_services_help_required" />
      <GroupedServiceField source="services" />
      <TextField source="applicant_person_type" />
      <TextField source="address_street" />
      <TextField source="address_number" />
      <TextField source="address_city" />
      <TextField source="address_psc" />
      <TextField source="address_country" />
      <TextField source="physical_person_first_name" />
      <TextField source="physical_person_last_name" />
      <TextField source="physical_person_identification_number" />
      <TextField source="legal_person_bussiness_name" />
      <TextField source="legal_person_ico" />
      <TextField source="legal_person_dic" />
      <TextField source="legal_person_dph" />
      <TextField source="legal_person_ic_dph" />
      <TextField source="legal_person_official_first_name" />
      <TextField source="legal_person_official_last_name" />
      <TextField source="legal_person_official_function" />
    </SimpleShowLayout>
  </Show>
)

export default RegistrationRequestShow
