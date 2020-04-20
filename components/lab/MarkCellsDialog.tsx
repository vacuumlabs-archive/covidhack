import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
)

export type CellType =
  | 'normal'
  | 'broken'
  | 'positiveControl'
  | 'negativeControl'
  | 'internalControl'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onSelect: (val: CellType) => void
}

// TODO: props
export default function DialogSelect({open, setOpen, onSelect}: Props) {
  const classes = useStyles()
  const [cellType, setCellType] = React.useState<CellType>('normal')

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nastavenie vybraných políčok</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Typ políčka</InputLabel>
              <Select
                value={cellType}
                onChange={(e) => setCellType(e.target.value as any)}
                input={<Input />}
              >
                <MenuItem value="normal">Normálne (prázdne alebo so vzorkou)</MenuItem>
                <MenuItem value="broken">Nefunkčné</MenuItem>
                <MenuItem value="positiveControl">Pozitívna kontrola</MenuItem>
                <MenuItem value="negativeControl">Negatívna kontrola</MenuItem>
                <MenuItem value="internalControl">Interná kontrola</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Zrušiť
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              onSelect(cellType)
            }}
            color="primary"
            variant="contained"
          >
            Potvrdiť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
