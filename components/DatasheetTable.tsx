import produce from 'immer'
import {isEmpty} from 'lodash'
import React, {useCallback, useMemo} from 'react'
import ReactDataSheet from 'react-datasheet'
import CellLegend, {
  CellType,
  LAB_TABLE_BACKGROUNDS,
  Props as CellLegendProps,
} from './lab/CellLegend'

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: string | null
  readonly?: boolean
  className?: string
  cellStatus?: CellType
}

interface Props extends CellLegendProps {
  grid: GridElement[][]
  setGrid: (grid: GridElement[][]) => void
  selected: ReactDataSheet.Selection | null
  onSelected: (selected: ReactDataSheet.Selection | null) => void
}

const DatasheetTable = ({
  grid,
  setGrid,
  selected,
  onSelected,
  onSetSelectedCellsStatus,
  selectable,
}: Props) => {
  const gridToDisplay = useMemo(
    () =>
      produce(grid, (draft) => {
        // if you select a cell and then shift click one of (start, end) is {}
        if (!selected || isEmpty(selected.end) || isEmpty(selected.start)) return draft
        for (let r = selected.start.i; r <= selected.end.i; r++) {
          for (let c = selected.start.j; c <= selected.end.j; c++) {
            // if you tab from last cell, you will end up in non-existent row
            // or if you shift+tab from first cell
            if (r >= 0 && r < draft.length) draft[r][0].className = 'selected'
            if (c >= 0 && c < draft[0].length) draft[0][c].className = 'selected'
          }
        }
        return draft
      }),
    [grid, selected],
  )

  // used for backgrounds only, because cellRenderer seems to break drag-to-select
  const valueViewer: ReactDataSheet.ValueViewer<GridElement, string> = useCallback((props) => {
    const backgroundStyle = props.cell.cellStatus
      ? {backgroundColor: LAB_TABLE_BACKGROUNDS[props.cell.cellStatus]}
      : {}
    return (
      <div style={backgroundStyle}>
        {props.cell.value}
        {/* a super hacky fix - the div (with color) did not render when value was empty,  add text with opacity 0 to force it */}
        {/* TODO correct way to do this is with cellRenderer, but having that always breaks drag-selection */}
        <span style={{opacity: 0}}>.</span>
      </div>
    )
  }, [])

  return (
    // https://github.com/nadbm/react-datasheet/issues/205
    <>
      <ReactDataSheet
        data={gridToDisplay}
        valueRenderer={(cell) => cell.value}
        onCellsChanged={(changes) => {
          setGrid(
            produce(grid, (draft) => {
              changes.forEach(({row, col, value}) => {
                draft[row][col] = {...draft[row][col], value}
              })
            }),
          )
        }}
        onSelect={(newSelected) => {
          onSelected(
            produce(selected, (s) => {
              if (!s) return newSelected
              if (!isEmpty(newSelected.start)) s.start = newSelected.start
              if (!isEmpty(newSelected.end)) s.end = newSelected.end
              return s
            }),
          )
        }}
        selected={selected}
        onContextMenu={(e) => e.preventDefault()}
        cellRenderer={undefined}
        valueViewer={valueViewer}
      />
      <CellLegend onSetSelectedCellsStatus={onSetSelectedCellsStatus} selectable={selectable} />

      {/* had to copy manually from react-datasheet package as importing in _app.tsx did not work */}
      <style jsx global>{`
        span.data-grid-container,
        span.data-grid-container:focus {
          outline: none;
        }

        .data-grid-container .data-grid {
          table-layout: fixed;
          border-collapse: collapse;
        }

        .data-grid-container .data-grid .cell.updated {
          background-color: rgba(0, 145, 253, 0.16);
          transition: background-color 0ms ease;
        }
        .data-grid-container .data-grid .cell {
          height: 17px;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          cursor: cell;
          background-color: unset;
          transition: background-color 500ms ease;
          vertical-align: middle;
          text-align: right;
          border: 1px solid #ddd;
          padding: 0;
        }
        .data-grid-container .data-grid .cell.selected {
          border: 1px double rgb(33, 133, 208);
          transition: none;
          box-shadow: inset 0 -100px 0 rgba(33, 133, 208, 0.15);
        }

        .data-grid-container .data-grid .cell.read-only {
          background: whitesmoke;
          color: #999;
          text-align: center;
        }

        .data-grid-container .data-grid .cell > .text {
          padding: 2px 5px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .data-grid-container .data-grid .cell > input {
          outline: none !important;
          border: 2px solid rgb(33, 133, 208);
          text-align: right;
          width: calc(100% - 6px);
          height: 11px;
          background: none;
          display: block;
        }

        .data-grid-container .data-grid .cell {
          vertical-align: bottom;
        }

        .data-grid-container .data-grid .cell,
        .data-grid-container .data-grid.wrap .cell,
        .data-grid-container .data-grid.wrap .cell.wrap,
        .data-grid-container .data-grid .cell.wrap,
        .data-grid-container .data-grid.nowrap .cell.wrap,
        .data-grid-container .data-grid.clip .cell.wrap {
          white-space: normal;
          padding: 4px;
          text-align: center;
        }

        .data-grid-container .data-grid.nowrap .cell,
        .data-grid-container .data-grid.nowrap .cell.nowrap,
        .data-grid-container .data-grid .cell.nowrap,
        .data-grid-container .data-grid.wrap .cell.nowrap,
        .data-grid-container .data-grid.clip .cell.nowrap {
          white-space: nowrap;
          overflow-x: visible;
        }

        .data-grid-container .data-grid.clip .cell,
        .data-grid-container .data-grid.clip .cell.clip,
        .data-grid-container .data-grid .cell.clip,
        .data-grid-container .data-grid.wrap .cell.clip,
        .data-grid-container .data-grid.nowrap .cell.clip {
          white-space: nowrap;
          overflow-x: hidden;
        }

        .data-grid-container .data-grid .cell .value-viewer,
        .data-grid-container .data-grid .cell .data-editor {
          display: block;
          font-size: 16px;
          border: 0;
          padding: 0;
          height: auto;
        }
      `}</style>
    </>
  )
}

export default DatasheetTable
