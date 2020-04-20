import {makeStyles} from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  legendEntry: {
    padding: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    border: '1px solid gray',
    borderLeft: 'unset',
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

interface Props {
  onSetSelectedCellsStatus: (cellType: CellType) => void
  style?: any
}

const CellLegend = ({onSetSelectedCellsStatus, style}: Props) => {
  const classes = useStyles()

  return (
    <div style={{...style}}>
      <span
        onClick={() => onSetSelectedCellsStatus('normal')}
        className={classes.legendEntry}
        style={{
          borderLeft: '1px solid gray',
          backgroundColor: LAB_TABLE_BACKGROUNDS['normal'],
        }}
      >
        Normálne políčko
      </span>
      <span
        onClick={() => onSetSelectedCellsStatus('positiveControl')}
        className={classes.legendEntry}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['positiveControl']}}
      >
        Pozitívna kontrola
      </span>
      <span
        onClick={() => onSetSelectedCellsStatus('negativeControl')}
        className={classes.legendEntry}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['negativeControl']}}
      >
        Negatívna kontrola
      </span>
      <span
        onClick={() => onSetSelectedCellsStatus('internalControl')}
        className={classes.legendEntry}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['internalControl']}}
      >
        Interná kontrola
      </span>
      <span
        onClick={() => onSetSelectedCellsStatus('broken')}
        className={classes.legendEntry}
        style={{backgroundColor: LAB_TABLE_BACKGROUNDS['broken']}}
      >
        Nefunkčné políčko
      </span>
    </div>
  )
}

export default CellLegend
