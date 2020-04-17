import {Button, CircularProgress, IconButton, Paper, Tab, Tabs, Typography} from '@material-ui/core'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import PostAdd from '@material-ui/icons/PostAdd'
import {makeStyles} from '@material-ui/styles'
import {clone, Dictionary, keyBy, pick} from 'lodash'
import MUIDataTable from 'mui-datatables'
import Router from 'next/router'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import useSWR from 'swr'
import {decrypt} from '../../logic/crypto'
import {State} from '../../logic/state'
import {formatDate} from '../../utils/formatter'
import {Application, Grid, Lab_Result} from '../../utils/graphqlSdk'
import {mapValuesAsync} from '../../utils/helpers'
import {
  createPdf,
  getJournalContent,
  getOfficeDocContent,
  getOfficeDocsContent,
} from '../../utils/pdf/pdf'
import NewApplicant from './NewApplicant'
import WrongPassword from './WrongPassword'

const useStyles = makeStyles({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  newApplicant: {
    marginLeft: '8px !important',
  },
})

const tableMuiTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        height: '63vh',
      },
    },
    MUIDataTableToolbar: {
      left: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    MuiTableCell: {
      root: {
        padding: '0 !important',
      },
    },
  } as any,
})

const createFetcher = (password) => (url) =>
  fetch(url)
    .then((r) => r.json())
    .then(async (applications) => {
      const ans = []
      for (const obj of applications) {
        ans.push({
          ...obj,
          ...(await mapValuesAsync(
            pick(obj, ['pacient_name', 'personal_number', 'sample_code', 'sender']),
            async (val) => await decrypt(val as string, password),
          )),
        })
      }
      return ans
    })

const rowToProtocolContent = (row) => ({
  content: {
    patientName: row.pacient_name || '',
    personalNumber: row.personal_number || '',
    sampleCode: row.sample_code || '',
    sender: row.sender || '',
    sampleCollectionDate: row.sample_collection_date || '',
    sampleReceiveDate: row.sample_receive_date || '',
    testResult: row.test_result || '',
    testStartDate: row.test_initiation_date || '',
    testEndDate: row.test_finished_date || '',
  },
})

const handlePrintProtocol = (row) => {
  createPdf(`protokol-${row.sample_code}.pdf`, getOfficeDocContent(rowToProtocolContent(row)))
}

const handlePrintProtocols = (rows) => {
  createPdf(`protokoly.pdf`, getOfficeDocsContent(rows.map(rowToProtocolContent)))
}

const rowToJournalContent = (row) => ({
  patientName: row.pacient_name || '',
  personalNumber: row.personal_number || '',
  sampleCode: row.sample_code || '',
  sender: row.sender || '',
  sampleCollectionDate: row.sample_collection_date || '',
  sampleReceiveDate: row.sample_receive_date || '',
  testEndDate: row.test_finished_date,
})

const handlePrintJournal = (row) => {
  createPdf(`zaznam-${row.sample_code}.pdf`, getJournalContent([rowToJournalContent(row)]))
}

const handlePrintJournals = (rows) => {
  createPdf(`zaznamy.pdf`, getJournalContent(rows.map(rowToJournalContent)))
}

const getEntries = (mode, {applications, grids, labResults, finishedLabResults}) => {
  // for the list of tested ,we work with jsut finished, TODO refactor this
  const usedLabResults = mode === 2 ? finishedLabResults : labResults

  const labResultsCopy = clone(usedLabResults)

  const allApplications = applications.map((row) => {
    const labResult = usedLabResults[row.sample_code]
    delete labResultsCopy[row.sample_code]
    const grid = grids[labResult?.referenced_in_grid_id]

    return {
      ...row,
      sample_collection_date: formatDate(row.sample_collection_date),
      sample_receive_date: formatDate(row.sample_receive_date),
      test_finished: grid?.finished,
      test_initiation_date: grid?.test_initiation_date && formatDate(grid?.test_initiation_date),
      test_finished_date: grid?.test_finished_date && formatDate(grid?.test_finished_date),
      test_result: grid?.finished ? (labResult.positive ? 'pozitívny' : 'negatívny') : null,
    }
  })

  const withNoApplication = Object.values(labResultsCopy).map((lr: Lab_Result) => {
    const grid = grids[lr?.referenced_in_grid_id]

    return {
      sample_code: lr.sample_code,
      pacient_name: null,
      personal_number: null,
      sample_collection_date: null,
      sample_receive_date: null,
      sender: null,
      test_finished: grid?.finished,
      test_initiation_date: grid?.test_initiation_date && formatDate(grid?.test_initiation_date),
      test_finished_date: grid?.test_finished_date && formatDate(grid?.test_finished_date),
      test_result: grid?.finished ? (lr.positive ? 'pozitívny' : 'negatívny') : null,
    }
  })

  if (mode === 0) {
    return withNoApplication
  } else if (mode === 1) {
    return [...allApplications, ...withNoApplication].filter(({test_finished}) => !test_finished)
  } else if (mode === 2) {
    // do not show entries with no application
    return [...allApplications].filter(({test_finished}) => test_finished)
  } else if (mode === 3) {
    // todo what is processed?
    return [...allApplications, ...withNoApplication]
  }
}

const sortEntries = (entries) => {
  const copy = [...entries]
  copy.sort((a1, a2) => {
    try {
      const numA1 = parseInt(a1.sample_code)
      const numA2 = parseInt(a2.sample_code)
      return numA1 < numA2 ? 1 : -1
    } catch (e) {
      // fallback if the sample code is not a number
      return a1.sample_code < a2.sample_code ? 1 : -1
    }
  })
  return copy
}

const Dashboard = () => {
  const [tabValue, setTabValue] = React.useState(0)
  const [dialog, setDialog] = useState({open: false, code: null})
  const classes = useStyles()
  const password = useSelector((state: State) => state.officePassword)

  // for some reason this doesn't refetch the data after the edit/create dialog is closed (and this
  // component rerenders). Using conditional fetching seems to work.
  const {data: applications, error: applicationsError} = useSWR<
    Array<Application> | undefined,
    any
  >(!dialog.open ? `/api/applications` : null, createFetcher(password))

  const {data: grids, error: gridsError} = useSWR<Dictionary<Grid> | undefined, any>(
    `/api/grids`,
    (url) =>
      fetch(url)
        .then((r) => r.json())
        .then((a) => keyBy(a, 'id')),
  )
  const {data: labResults, error: labResultsError} = useSWR<
    Dictionary<Lab_Result> | undefined,
    any
  >(`/api/lab-results`, (url) =>
    fetch(url)
      .then((r) => r.json())
      // todo if there are more la
      .then((a) => keyBy(a, 'sample_code')),
  )

  const {data: finishedLabResults, error: finishedLabResultsError} = useSWR<
    Dictionary<Lab_Result> | undefined,
    any
  >(`/api/finished-lab-results`, (url) =>
    fetch(url)
      .then((r) => r.json())
      // todo if there are more la
      .then((a) => keyBy(a, 'sample_code')),
  )

  if (applicationsError || gridsError || labResultsError) {
    console.error(applicationsError)
    return <WrongPassword />
  }

  if (!applications || !grids || !labResults || !finishedLabResults) {
    return (
      <div style={{textAlign: 'center', marginTop: '20px'}}>
        <CircularProgress />
      </div>
    )
  }

  const entries = sortEntries(
    getEntries(tabValue, {applications, grids, labResults, finishedLabResults}),
  )

  return (
    <div style={{margin: 16}}>
      <Tabs
        value={tabValue}
        onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
          setTabValue(newValue)
        }}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        <Tab label="Nespárovaní" />
        <Tab label="Neotestovaní" />
        <Tab label="Otestovaní" />
        {/* <Tab label="Všetky" /> TODO: enable when we are able to mark entry as processed */}
      </Tabs>

      <Paper style={{marginBottom: 16}}>
        <MuiThemeProvider theme={tableMuiTheme}>
          <MUIDataTable
            title={
              <>
                <Typography variant="h6" style={{display: 'inline-block'}}>
                  {'Zoznam záznamov'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.newApplicant}
                  onClick={() => setDialog({open: true, code: null})}
                >
                  Nový žiadateľ
                </Button>
              </>
            }
            data={entries.map((row) => [
              row.sample_code,
              tabValue !== 0 && row.pacient_name,
              tabValue !== 0 && row.personal_number,
              tabValue !== 0 && row.sample_collection_date,
              tabValue !== 0 && row.sample_receive_date,
              tabValue !== 0 && row.sender,
              tabValue !== 1 && row.test_initiation_date,
              tabValue !== 1 && row.test_finished_date,
              tabValue !== 1 && row.test_result,
              row.pacient_name ? (
                <IconButton
                  key={row.id}
                  onClick={() => Router.push('/office/[id]', `/office/${row.id}`)}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton
                  key={row.id}
                  onClick={() => setDialog({open: true, code: row.sample_code})}
                >
                  <PostAdd />
                </IconButton>
              ),
              tabValue === 2 && (
                <IconButton key={row.id} onClick={() => handlePrintProtocol(row)}>
                  <PictureAsPdfIcon />
                </IconButton>
              ),
              tabValue === 2 && (
                <IconButton key={row.id} onClick={() => handlePrintJournal(row)}>
                  <PictureAsPdfIcon />
                </IconButton>
              ),
            ])}
            columns={[
              'Číslo vzorky',
              tabValue !== 0 && 'Priezvisko a meno',
              tabValue !== 0 && 'Rodné číslo',
              tabValue !== 0 && 'Dátum odberu',
              tabValue !== 0 && 'Dátum príjmu',
              tabValue !== 0 && 'Odosielateľ',
              tabValue !== 1 && 'Začiatok skúšky',
              tabValue !== 1 && 'Ukončenie skúšky',
              tabValue !== 1 && 'Výsledok',
              'Upraviť',
              tabValue === 2 && 'Protokol',
              tabValue === 2 && 'Záznam',
            ]}
            options={{
              filterType: 'dropdown',
              // TODO: might consider this later
              expandableRows: false,
              responsive: 'scrollFullHeight',
              // onRowsSelect: (row) => console.log('select', row),
              // onRowsExpand: (row) => console.log('expand', row),
              // onRowClick: (row) => console.log('click', row),
              // onCellClick: (row) => console.log('cell', row),
              print: false,
              download: false,
              filter: false,
              viewColumns: false,
              customToolbarSelect: (selectedRows) => (
                <div>
                  <strong>Protokoly: </strong>
                  <IconButton
                    onClick={() =>
                      handlePrintProtocols(
                        selectedRows.data.map(({dataIndex}) => entries[dataIndex]),
                      )
                    }
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                  <strong style={{marginLeft: '16px'}}>Záznamy: </strong>
                  <IconButton
                    onClick={() =>
                      handlePrintJournals(
                        selectedRows.data.map(({dataIndex}) => entries[dataIndex]),
                      )
                    }
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                </div>
              ),
            }}
          />
        </MuiThemeProvider>
      </Paper>
      <NewApplicant close={() => setDialog({open: false, code: null})} {...dialog} />
    </div>
  )
}

export default Dashboard
