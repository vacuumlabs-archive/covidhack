import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@material-ui/core'
import LoadingIcon from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
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

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: string | null
  positive?: boolean
  readOnly: boolean
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

type Props = {
  grid: GridWithLabResultsQueryQuery
}

const EditLabResultSamples = ({grid}: Props) => {
  const [isSavingCells, setIsSavingCells] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
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

  const removeLabResult = useCallback(
    (props) =>
      fetch('/api/remove-lab-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      }).then((r) => r.json()),
    [],
  )

  const valueViewer: ReactDataSheet.ValueViewer<GridElement, string> = useCallback((props) => {
    const isFrame = props.row === 0 || props.col === 0
    const backgroundStyle = props.cell.positive ? {backgroundColor: 'red'} : {}
    const frameStyle = isFrame ? {background: 'whitesmoke', color: '#999'} : {}
    return (
      <div style={{...backgroundStyle, ...frameStyle}}>
        {props.cell.value}
        {/* a super hacky fix - the div (with color) did not render when value was empty,  add text with opacity 0 to force it */}
        {/* TODO correct way to do this is with cellRenderer, but having that always breaks drag-selection */}
        <span style={{opacity: 0}}>.</span>
      </div>
    )
  }, [])

  const anyCellChange = () => {
    const initial = mapLabResultsToGrid(grid.lab_result)
    let changed = false
    removeFrame(labResultDataTable).forEach((row, r) =>
      row.forEach((cell: any, c) => {
        if (cell.value !== initial[r][c].value) {
          changed = true
        }
      }),
    )
    return changed
  }
  const containsChanges = anyCellChange()

  if (!grid) return <div />
  return (
    <>
      <Layout isFormPage>
        <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
          <DialogTitle>Upraviť čísla vzoriek</DialogTitle>
          <DialogContent>
            <DialogContentText>Naozaj si prajete uložiť zmeny?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => {
                setShowConfirmDialog(false)
                setIsSavingCells(true)

                const initial = mapLabResultsToGrid(grid.lab_result)
                const promises = []
                removeFrame(labResultDataTable).forEach((row, r) =>
                  row.forEach((cell: any, c) => {
                    if (cell.value !== initial[r][c].value) {
                      // update lab result won't accept empty sample code
                      if (cell.value) {
                        console.log('not called')
                        promises.push(
                          updateLabResult({
                            gridId: grid.grid_by_pk.id,
                            column: c,
                            row: r,
                            sampleCode: cell.value,
                          }),
                        )
                      } else {
                        promises.push(
                          removeLabResult({
                            id: cell.labResultId,
                          }),
                        )
                      }
                    }
                  }),
                )
                await Promise.all(promises)
                Router.push(`/edit-lab-result/${grid.grid_by_pk.id}`)
              }}
              color="secondary"
              variant="contained"
            >
              Áno
            </Button>
            <Button
              onClick={() => {
                setShowConfirmDialog(false)
              }}
              color="primary"
              variant="contained"
              autoFocus
            >
              Nie
            </Button>
          </DialogActions>
        </Dialog>

        <Paper
          style={{
            minHeight: 'calc(100vh - 75px - 120px)',
            display: 'flex',
            flexDirection: 'column',
            margin: 16,
            padding: 16,
          }}
        >
          <Alert severity="warning" style={{marginBottom: 8}}>
            Ak ste sa pomýlili v číslach vzoriek, tu ich môžete opraviť. Stačí, ak čísla vzoriek v
            tabuľke prepíšete a zmeny uložíte.
          </Alert>

          <MyReactDataSheet
            data={labResultDataTable}
            valueRenderer={(cell) => cell.value}
            valueViewer={valueViewer}
            onCellsChanged={(changes) => {
              setLabResultDataTable(
                produce(labResultDataTable, (draft) => {
                  changes.forEach(({row, col, value}) => {
                    draft[row][col] = {...draft[row][col], value}
                  })
                }),
              )
            }}
          />
          <div className="button-panel">
            <Button
              variant="contained"
              onClick={() => Router.push(`/edit-lab-result/${grid.grid_by_pk.id}`)}
            >
              Zrušiť
            </Button>

            <Button
              style={{marginLeft: 8}}
              variant="contained"
              color="primary"
              onClick={async () => {
                setShowConfirmDialog(true)
              }}
              disabled={!containsChanges || isSavingCells}
              startIcon={isSavingCells && <LoadingIcon style={{color: 'white'}} size={20} />}
            >
              Uložiť zmeny
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

  return {
    props: {
      grid,
    },
  }
}

export default EditLabResultSamples