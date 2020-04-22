import {Button, IconButton, Paper, TextField} from '@material-ui/core'
import LoadingIcon from '@material-ui/core/CircularProgress'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import Alert from '@material-ui/lab/Alert'
import produce from 'immer'
import Router from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import ReactDataSheet from 'react-datasheet'
import DatasheetTable, {GridElement} from '../components/DatasheetTable'
import {CellType} from '../components/lab/CellLegend'
import Layout from '../components/Layout'
import {
  addFrame,
  autofillGrid,
  createEmptyGrid,
  findPreviousOnFramedGrid,
  isNormalInteger,
  removeFrame,
  removeInvalidSampleCode,
} from '../utils/helpers'
import {createPdf, getGridContent} from '../utils/pdf/pdf'
import {createGridBodySchema} from '../utils/validations'

const removeInvalidSampleCodeCells = (grid: GridElement[][]) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      // TODO: inline validation for this
      grid[r][c] = removeInvalidSampleCode(grid[r][c])
    }
  }

  return grid
}

const CreateLabResult = () => {
  const [selected, onSelect] = useState<ReactDataSheet.Selection>(null)
  const [grid, setGrid] = useState<GridElement[][]>(addFrame(createEmptyGrid()))
  const [title, setTitle] = useState<string>('')
  const [gridError, setGridError] = useState<string | null>(null)
  const [titleValidationEnabled, setTitleValidationEnabled] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState(false)

  const titleInWrongFormat = !title.match(/^.*\/.*\/.*$/)

  const submit = useCallback(async () => {
    if (titleInWrongFormat) {
      setTitleValidationEnabled(true)
      return
    }
    if (gridError) return

    setSubmitting(true)
    const body = {
      grid: removeInvalidSampleCodeCells(removeFrame(grid)),
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
      if (response.ok) {
        Router.push('/')
      } else {
        throw response
      }
    } catch (e) {
      setSubmitting(false)
      // TODO: solve error handling
      // setError('Nastala neznáma chyba, prosím skúste akciu zopakovať.')
    }
  }, [grid, title, titleInWrongFormat, gridError])

  const setSelectedCellsStatus = useCallback(
    (cellType: CellType) => {
      setGrid(
        produce(grid, (draft) => {
          if (!selected) return draft
          for (let i = selected.start.i; i <= selected.end.i; i++) {
            for (let j = selected.start.j; j <= selected.end.j; j++) {
              // ignoring frame
              if (i === 0 || j === 0) continue
              // ignoring filled numbers
              if (!draft[i][j].value) draft[i][j].cellStatus = cellType
            }
          }
        }),
      )
    },
    [grid, selected],
  )

  useEffect(() => {
    const handler = (event) => {
      const keyName = event.key
      if (keyName === 'Control') {
        if (!selected) return
        const {i, j} = selected.start
        // not doing anything on a frame or if value is already filled
        if (i === 0 || j === 0 || grid[i][j].value) return
        const loc = findPreviousOnFramedGrid(grid, selected.start)
        // if no previous value exists or it's not a number it's not clear how to fill
        if (!loc || !isNormalInteger(loc.value)) return
        setGrid(autofillGrid(grid, loc, selected.start, Number.parseInt(loc.value)))
      }
    }
    document.addEventListener('keydown', handler, false)
    return () => {
      document.removeEventListener('keydown', handler, false)
    }
  }, [grid, selected])

  return (
    <>
      <Layout isFormPage headerTitle="Nová mriežka">
        <Paper
          style={{
            minHeight: 'calc(100vh - 75px - 120px)',
            display: 'flex',
            flexDirection: 'column',
            margin: 16,
            padding: 16,
          }}
        >
          {/* TODO: use error state for ui before submiting */}
          <TextField
            autoFocus
            value={title}
            label="Laboratórium/Kód testovaceho stroja/Meno laboranta"
            variant="outlined"
            onChange={(e) => {
              setTitleValidationEnabled(true)
              setTitle(e.target.value)
            }}
            error={titleValidationEnabled && titleInWrongFormat}
            helperText={
              titleValidationEnabled &&
              titleInWrongFormat &&
              'Názov testu musí mať formát: laboratórium/kód-testovaceho-stroja/meno-laboranta'
            }
          />

          <Alert severity="info" style={{marginTop: 8}}>
            Na navigovanie po mriežke môžete použiť šípky na klávesnici. Políčka vyplnené farbou
            pozadím predstavujú špeciálne políčka.
          </Alert>

          <Alert severity="info" style={{marginTop: 8}}>
            Pre označenie špeciálnych políčok označte dané políčka tabuľky a zvoľte typ špeciálneho
            políčka kliknutím na tlačítka v legende. Špeciálne políčka sa preskakujú.
          </Alert>

          <Alert severity="info" style={{marginTop: 8, marginBottom: 8}}>
            Pre automatické vyplnenie prázdnych políčok podľa posledného vyplneného stlačte CTRL na
            zvolenom prázdnom políčku. Ak je v nejakom z predchádzajúcich políčok tabuľky vyplnené
            číslo vzorky, tak sa prázdne políčka (vrátane zvoleného) vyplnia automaticky. Špeciálne
            políčka sa preskakujú.
          </Alert>

          {gridError && (
            <Alert severity="error" style={{marginBottom: 8}}>
              {gridError}
            </Alert>
          )}

          <div className="wrapper">
            <DatasheetTable
              grid={grid}
              setGrid={setGrid}
              onSelected={onSelect}
              selected={selected}
              selectable={true}
              onSetSelectedCellsStatus={setSelectedCellsStatus}
              onGridError={setGridError}
            />

            <div className="button-panel">
              <IconButton onClick={() => createPdf(title, getGridContent(title, grid))}>
                <PictureAsPdfIcon />
              </IconButton>
              <Button
                variant="contained"
                onClick={submit}
                color="primary"
                disabled={submitting}
                startIcon={submitting && <LoadingIcon style={{color: 'white'}} size={20} />}
              >
                Začať test
              </Button>
            </div>
          </div>
        </Paper>
      </Layout>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .button-panel-wrapper {
          display: flex;
          width: 100%;
          flex-direction: row;
        }

        .button-panel {
          margin: 8px 0;
          margin-left: auto;
        }

        .img {
          width: 100%;
          max-width: 200px;
          height: 187px;
        }
      `}</style>
    </>
  )
}

export default CreateLabResult
