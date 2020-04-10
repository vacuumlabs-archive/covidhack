import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}))

export default function SimpleModal({open, onClose, children}) {
  const classes = useStyles()
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.paper}>{children}</div>
    </Modal>
  )
}
