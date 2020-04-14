import {Button, Paper, TextField} from '@material-ui/core'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import produce from 'immer'
import {GetServerSideProps} from 'next'
import Router from 'next/router'
import React, {useCallback, useState} from 'react'
import ReactDataSheet from 'react-datasheet'
import Layout from '../../components/Layout'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'
import {GridWithLabResultsQueryQuery} from '../../utils/graphqlSdk'
import {addFrame, mapLabResultsToGrid, removeFrame} from '../../utils/helpers'
import {printLabDoc} from '../../utils/pdf/pdf'

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: string | null
  positive?: boolean
  readOnly: boolean
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

type Props = {
  grid: GridWithLabResultsQueryQuery
}

const EditLabResult = ({grid}: Props) => {
  const [localTitle, setLocalTitle] = useState(grid.grid_by_pk.title)
  const [labResultDataTable, setLabResultDataTable] = useState(
    addFrame(mapLabResultsToGrid(grid.lab_result)),
  )

  const updateLabResult = useCallback(
    (updateProps) =>
      fetch('/api/update-lab-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProps),
      }).then((r) => r.json()),
    [],
  )

  const updateGrid = useCallback(
    (updateProps) =>
      fetch('/api/update-grid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProps),
      }).then((r) => r.json()),
    [],
  )

  const valueViewer: ReactDataSheet.ValueViewer<GridElement, string> = useCallback((props) => {
    const isFrame = props.row === 0 || props.col === 0
    const backgroundStyle = props.cell.positive ? {backgroundColor: 'red'} : {}
    const frameStyle = isFrame ? {background: 'whitesmoke', color: '#999'} : {}
    return <div style={{...backgroundStyle, ...frameStyle}}>{props.cell.value}</div>
  }, [])

  const cellRenderer: ReactDataSheet.CellRenderer<GridElement, string> = useCallback(
    (props) => {
      // dont edit finished and dont add on frame
      const isFrame = props.row === 0 || props.col === 0
      const dontAddOnClick = grid.grid_by_pk.finished || isFrame
      const backgroundStyle = props.cell.positive ? {backgroundColor: 'red'} : {}
      const cursorStyle = dontAddOnClick ? {} : {cursor: 'pointer'}
      const frameStyle = isFrame ? {background: 'whitesmoke', color: '#999'} : {}
      return (
        <td
          style={{...backgroundStyle, ...cursorStyle, ...frameStyle, width: 200}}
          onMouseDown={
            dontAddOnClick
              ? props.onMouseDown
              : () =>
                  setLabResultDataTable(
                    produce(labResultDataTable, (data: any) => {
                      data[props.row][props.col].positive = !props.cell.positive
                    }),
                  )
          }
          onMouseOver={props.onMouseOver}
          className={`cell ${props.isFrame ? 'frame' : ''}`}
        >
          {props.children}
        </td>
      )
    },
    [grid, labResultDataTable],
  )

  const anyCellChange = () => {
    const initial = mapLabResultsToGrid(grid.lab_result)
    let changed = false
    removeFrame(labResultDataTable).forEach((row, r) =>
      row.forEach((cell: any, c) => {
        if (cell.positive !== initial[r][c].positive) {
          changed = true
        }
      }),
    )
    return changed
  }
  const containsChanges = localTitle !== grid.grid_by_pk.title || anyCellChange()

  if (!grid) return <div />
  return (
    <>
      <Layout isFormPage>
        <Paper
          style={{
            minHeight: 'calc(100vh - 75px - 120px)',
            display: 'flex',
            flexDirection: 'column',
            margin: 16,
            padding: 16,
          }}
        >
          <TextField
            autoFocus
            value={localTitle}
            placeholder="Title"
            variant="outlined"
            onChange={(e) => {
              setLocalTitle(e.target.value)
            }}
            style={{marginBottom: 8}}
          />
          <MyReactDataSheet
            data={labResultDataTable}
            valueRenderer={(cell) => cell.value}
            valueViewer={valueViewer}
            cellRenderer={!grid.grid_by_pk.finished ? cellRenderer : undefined}
          />
          <div className="button-panel">
            <Button
              variant="contained"
              onClick={() => printLabDoc(grid.grid_by_pk)}
              disabled={!grid.grid_by_pk.finished}
              startIcon={<PictureAsPdfIcon />}
            >
              Stiahnuť protokol
            </Button>
            <Button
              style={{marginLeft: 8}}
              variant="contained"
              color="primary"
              onClick={() => {
                updateGrid({id: grid.grid_by_pk.id, title: localTitle})

                const initial = mapLabResultsToGrid(grid.lab_result)
                removeFrame(labResultDataTable).forEach((row, r) =>
                  row.forEach((cell: any, c) => {
                    if (cell.positive !== initial[r][c].positive) {
                      updateLabResult({
                        gridId: grid.grid_by_pk.id,
                        column: c,
                        row: r,
                        positive: cell.positive,
                      })
                    }
                  }),
                )

                Router.push('/lab')
              }}
              disabled={!containsChanges}
            >
              Uložiť zmeny
            </Button>
            <Button
              style={{marginLeft: 8}}
              variant="contained"
              color="secondary"
              onClick={() => {
                updateGrid({id: grid.grid_by_pk.id, finished: !grid.grid_by_pk.finished})
                Router.push('/lab')
              }}
            >
              {grid.grid_by_pk.finished ? 'Znovu otvoriť' : 'Označiť za ukončené'}
            </Button>
          </div>
        </Paper>
      </Layout>
      <style jsx>{`
        .button-panel {
          margin: 8px 0;
          align-self: flex-end;
        }

        .wrapper {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }
        .img {
          width: 100%;
          max-width: 200px;
          height: 187px;
        }
      `}</style>
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
        }
      `}</style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!allowAccessFor(context.req.headers.authorization, ['kancelaria'])) {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return
  }

  const grid = await client.GridWithLabResultsQuery({
    id: context.params.id,
  })

  console.log(context.params.id)

  return {
    props: {
      grid,
    },
  }
}

export default EditLabResult
