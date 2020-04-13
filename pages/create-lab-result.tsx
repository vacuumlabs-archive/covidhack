import {TextField} from '@material-ui/core'
import produce from 'immer'
import {GetServerSideProps} from 'next'
import {useRouter} from 'next/router'
import React, {useCallback, useMemo, useState} from 'react'
import ReactDataSheet from 'react-datasheet'
import Layout from '../components/Layout'
import {allowAccessFor} from '../utils/auth'
import {addFrame, autofillGrid, createEmptyGrid, removeFrame} from '../utils/helpers'
import {createGridBodySchema} from '../utils/validations'

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: string | null
  readonly?: boolean
  className?: string
  broken?: boolean
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

const SuccessRegistration = () => {
  const [grid, setGrid] = useState<GridElement[][]>(addFrame(createEmptyGrid()))
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState('')
  const [brokenFieldsEditMode, setBrokenFieldsEditMode] = useState(false)
  const submit = useCallback(async () => {
    setError('')
    const body = {
      grid: removeFrame(grid),
      title: title,
    }
    try {
      createGridBodySchema.validateSync(body)
      const response = await fetch('/api/create-grid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.ok) router.push('/lab')
    } catch (e) {
      if (e && e.message) {
        setError(e.message)
      } else {
        setError('Something went wrong, please try again.')
      }
    }
  }, [grid, router, title])

  // higlight row and collumn label of the selected cell by adding a className to it
  const [selected, onSelect] = useState<ReactDataSheet.Selection>(null)
  const gridToDisplay = useMemo(
    () =>
      produce(grid, (draft) => {
        if (!selected) return draft
        draft[selected.start.i][0].className = 'selected'
        draft[0][selected.start.j].className = 'selected'
        return draft
      }),
    [grid, selected],
  )

  // used for backgrounds only, because cellRenderer seems to break drag-to-select
  const valueViewer: ReactDataSheet.ValueViewer<GridElement, string> = useCallback((props) => {
    const backgroundStyle = props.cell.broken ? {backgroundColor: 'yellow'} : {}
    return (
      <div style={backgroundStyle}>
        {props.cell.value}
        {/* a super hacky fix - the div (with color) did not render when value was empty,  add text with opacity 0 to force it */}
        {/* TODO correct way to do this is with cellRenderer, but having that always breaks drag-selection */}
        <span style={{opacity: 0}}>.</span>
      </div>
    )
  }, [])

  const cellRenderer: ReactDataSheet.CellRenderer<GridElement, string> = useCallback(
    (props) => {
      // don't change the behaviour for the frame
      const style = props.cell.readOnly ? undefined : {cursor: 'pointer', width: 200}
      const onMouseDown = props.cell.readOnly
        ? props.onMouseDown
        : () => {
            setGrid(
              produce(grid, (draft) => {
                draft[props.row][props.col].broken = !draft[props.row][props.col].broken
              }),
            )
          }
      return (
        <td
          style={style}
          onMouseDown={onMouseDown}
          onMouseOver={props.onMouseOver}
          className="cell"
        >
          {props.children}
        </td>
      )
    },
    [grid],
  )

  return (
    <>
      <Layout isFormPage>
        <div className="container">
          <div className="wrapper">
            <TextField
              value={title}
              label="Title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <button onClick={() => setBrokenFieldsEditMode(!brokenFieldsEditMode)}>
              {brokenFieldsEditMode ? 'Nastavit Hodnoty' : 'Nastavit nefunkcne polia'}
            </button>
            <button onClick={() => setGrid(addFrame(autofillGrid(removeFrame(grid))))}>
              Doplnit automaticky
            </button>
            <div style={{color: 'green'}}>
              Tlacitko doplnit automaticky vyplni cisla vzoriek zaradom, po stlpcoch. Ak narazi na
              existujucu hodnotu, bude pokracovat v cislovani od nej. Automaticky preskoci nefunkcne
              polia.
            </div>
            {brokenFieldsEditMode && (
              <div style={{color: 'red'}}>
                Kliknutim nastavte ktore polia maju byt vynechane pri automatickom vyplnani
              </div>
            )}
            <MyReactDataSheet
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
              onSelect={onSelect}
              selected={selected}
              cellRenderer={brokenFieldsEditMode ? cellRenderer : undefined}
              valueViewer={valueViewer}
            />
            <button onClick={submit}>Submit</button>
            <div style={{color: 'red'}}>{error}</div>
          </div>
        </div>
      </Layout>
      <style jsx>{`
        .container {
          min-height: calc(100vh - 75px - 120px);
          display: flex;
          justify-content: center;
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

  return {
    props: {},
  }
}

export default SuccessRegistration
