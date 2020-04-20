import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import classnames from 'classnames'
import React from 'react'

const useStyles = makeStyles({
  legendEntry: {
    padding: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  selectable: {
    cursor: 'pointer',
  },
})

export type CellType =
  | 'normal'
  | 'broken'
  | 'positiveControl'
  | 'negativeControl'
  | 'internalControl'

export const LAB_TABLE_BACKGROUNDS: Record<CellType, string> = {
  normal: 'unset',
  broken: 'yellow',
  positiveControl: 'lightgreen',
  negativeControl: 'lightcoral',
  internalControl: 'lightblue',
}

export interface Props {
  onSetSelectedCellsStatus: (cellType: CellType) => void
  selectable?: boolean
}

const CellLegend = ({onSetSelectedCellsStatus, selectable}: Props) => {
  const classes = useStyles()

  return (
    <div style={{marginTop: 16, marginBottom: 16}}>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('normal')}
        className={classnames(classes.legendEntry, selectable && classes.selectable)}
        style={{
          backgroundColor: LAB_TABLE_BACKGROUNDS['normal'],
        }}
      >
        Normálne políčko
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('positiveControl')}
        className={classnames(classes.legendEntry, selectable && classes.selectable)}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['positiveControl']}}
      >
        Pozitívna kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('negativeControl')}
        className={classnames(classes.legendEntry, selectable && classes.selectable)}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['negativeControl']}}
      >
        Negatívna kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('internalControl')}
        className={classnames(classes.legendEntry, selectable && classes.selectable)}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['internalControl']}}
      >
        Interná kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('broken')}
        className={classnames(classes.legendEntry, selectable && classes.selectable)}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['broken']}}
      >
        Nefunkčné políčko
      </Button>
    </div>
  )
}

export default CellLegend
