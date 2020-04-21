import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
  title: string
  description: string
}

const ConfirmationDialog = ({open, setOpen, onConfirm, onCancel, title, description}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Áno
        </Button>
        <Button onClick={onCancel} color="primary" variant="contained" autoFocus>
          Nie
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
