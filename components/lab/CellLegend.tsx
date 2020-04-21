import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import classnames from 'classnames'
import React from 'react'

export type CellType =
  | 'normal'
  | 'broken'
  | 'positiveControl'
  | 'negativeControl'
  | 'internalControl'

export const LAB_TABLE_BACKGROUNDS: Record<CellType, string> = {
  normal: 'unset',
  broken: '#ffff00',
  positiveControl: '#90ee90',
  negativeControl: '#f08080',
  internalControl: '#add8e6',
}

const useStyles = makeStyles({
  legendEntry: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(0, 0, 0, 0.87) !important',
    border: '1px solid gray !important',
    borderLeft: 'unset !important',
    borderRadius: '0 !important',
  },
  legendNormal: {
    borderLeft: '1px solid gray !important',
    backgroundColor: `${LAB_TABLE_BACKGROUNDS['normal']} !important`,
  },
  legendBroken: {
    backgroundColor: `${LAB_TABLE_BACKGROUNDS['broken']} !important`,
  },
  legendPositive: {
    backgroundColor: `${LAB_TABLE_BACKGROUNDS['positiveControl']} !important`,
  },
  legendNegative: {
    backgroundColor: `${LAB_TABLE_BACKGROUNDS['negativeControl']} !important`,
  },
  legendInternalControl: {
    backgroundColor: `${LAB_TABLE_BACKGROUNDS['internalControl']} !important`,
  },
  // for hover colors I used https://www.w3schools.com/colors/colors_mixer.asp to mix a darker color
  // version.
  legendButtonNormal: {
    '&:hover': {
      backgroundColor: '#d5d5d5', // default mui hover color
    },
  },
  legendButtonBroken: {
    '&:hover': {
      backgroundColor: '#e6e600',
    },
  },
  legendButtonPositive: {
    '&:hover': {
      backgroundColor: '#82d682',
    },
  },
  legendButtonNegative: {
    '&:hover': {
      backgroundColor: '#d87373',
    },
  },
  legendButtonInternalControl: {
    '&:hover': {
      backgroundColor: '#9cc2cf',
    },
  },
})

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
        className={classnames(
          classes.legendEntry,
          classes.legendNormal,
          selectable && classes.legendButtonNormal,
        )}
        disabled={!selectable}
      >
        Normálne políčko
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('positiveControl')}
        className={classnames(
          classes.legendEntry,
          classes.legendPositive,
          selectable && classes.legendButtonPositive,
        )}
        disabled={!selectable}
      >
        Pozitívna kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('negativeControl')}
        className={classnames(
          classes.legendEntry,
          classes.legendNegative,
          selectable && classes.legendButtonNegative,
        )}
        disabled={!selectable}
      >
        Negatívna kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('internalControl')}
        className={classnames(
          classes.legendEntry,
          classes.legendInternalControl,
          selectable && classes.legendButtonInternalControl,
        )}
        disabled={!selectable}
      >
        Interná kontrola
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => onSetSelectedCellsStatus('broken')}
        className={classnames(
          classes.legendEntry,
          classes.legendBroken,
          selectable && classes.legendButtonBroken,
        )}
        disabled={!selectable}
      >
        Nefunkčné políčko
      </Button>
    </div>
  )
}

export default CellLegend
