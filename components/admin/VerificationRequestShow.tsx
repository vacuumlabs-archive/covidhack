import IconButton from '@material-ui/core/Button'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import React, {useCallback, useState} from 'react'
import {DateField, EmailField, Show, SimpleShowLayout, TextField, TopToolbar} from 'react-admin'
import {fetchFile} from '../../utils/frontendHelper'
import Modal from './Modal'

const VerificationRequestShowActions = ({basePath, data, resource}) => {
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [denyModalOpen, setDenyModalOpen] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleApproveModalOpen = useCallback(() => setApproveModalOpen(true), [])
  const handleApproveModalClose = useCallback(() => {
    setResponseMessage('')
    setApproveModalOpen(false)
  }, [])
  const handleDenyModalOpen = useCallback(() => setDenyModalOpen(true), [])
  const handleDenyModalClose = useCallback(() => {
    setResponseMessage('')
    setDenyModalOpen(false)
  }, [])

  const sendResponse = useCallback(
    async (status) => {
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        body: JSON.stringify({id: data.id, status}),
        headers: {
          'X-Hasura-Admin-Secret': localStorage.getItem('admin-header'),
        },
      })
      if (response.status === 200) {
        setResponseMessage('Email uspesne odoslany')
      } else {
        setResponseMessage(
          `
        Nieco nie je v poriadku, prosim skontrolujte ci mail odisiel v SendGride.
        
        Status: ${response.status}`,
        )
      }
    },
    [data],
  )
  return (
    <>
      <TopToolbar>
        {data?.status === 'pending' && (
          <>
            <IconButton color="secondary" onClick={handleApproveModalOpen}>
              <CheckIcon />
              &nbsp; Approve
            </IconButton>
            <IconButton color="primary" onClick={handleDenyModalOpen}>
              <CancelIcon />
              &nbsp; Deny
            </IconButton>
          </>
        )}
        {data?.type === 'image' && (
          <IconButton
            color="secondary"
            onClick={() => {
              fetchFile(
                '/api/download',
                {
                  'X-Hasura-Admin-Secret': localStorage.getItem('admin-header'),
                },
                {key: data.value},
              )
            }}
          >
            <DownloadIcon />
            &nbsp; Download Image
          </IconButton>
        )}
      </TopToolbar>
      <Modal open={approveModalOpen} onClose={handleApproveModalClose}>
        {responseMessage ? (
          <>
            {responseMessage}
            <IconButton color="secondary" onClick={handleApproveModalClose}>
              <CheckIcon />
              &nbsp; Ok
            </IconButton>
          </>
        ) : (
          <>
            Approve this request ?
            <IconButton color="secondary" onClick={() => sendResponse('approved')}>
              <CheckIcon />
              &nbsp; Yes
            </IconButton>
            <IconButton color="primary" onClick={handleApproveModalClose}>
              <CancelIcon />
              &nbsp; No
            </IconButton>
          </>
        )}
      </Modal>
      <Modal open={denyModalOpen} onClose={handleDenyModalClose}>
        {responseMessage ? (
          <>
            {responseMessage}
            <IconButton color="secondary" onClick={handleDenyModalClose}>
              <CheckIcon />
              &nbsp; Ok
            </IconButton>
          </>
        ) : (
          <>
            Deny this request ?
            <IconButton color="secondary" onClick={() => sendResponse('dismissed')}>
              <CheckIcon />
              &nbsp; Yes
            </IconButton>
            <IconButton color="primary" onClick={handleDenyModalClose}>
              <CancelIcon />
              &nbsp; No
            </IconButton>
          </>
        )}
      </Modal>
    </>
  )
}

const VerificationRequestShow = (props) => (
  <Show {...props} actions={<VerificationRequestShowActions {...props} />}>
    <SimpleShowLayout>
      <TextField source="status" />
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="phone" />
      <EmailField source="email" />
      <TextField source="category" />
      <TextField source="international_countries_validity" />
      <TextField source="type" />
      <TextField source="value" />
      <TextField source="service_description" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </SimpleShowLayout>
  </Show>
)

export default VerificationRequestShow
