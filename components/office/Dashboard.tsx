import {Button, IconButton, Paper, Tab, Tabs, Typography} from '@material-ui/core'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import {makeStyles} from '@material-ui/styles'
import MUIDataTable from 'mui-datatables'
import Router from 'next/router'
import React, {useState} from 'react'
import {ApplicationsQueryQuery} from '../../utils/graphqlSdk'
import {createPdf, getOfficeDocContent} from '../../utils/pdf/pdf'
import NewApplicant from './NewApplicant'

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
  } as any,
})

interface Props {
  applications: ApplicationsQueryQuery
}

const Dashboard = ({applications}: Props) => {
  const [value, setValue] = React.useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles()

  return (
    <div style={{margin: 16}}>
      <Tabs
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
          setValue(newValue)
        }}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        <Tab label="Nespárovaný" />
        <Tab label="Neotestovaný" />
        <Tab label="Otestovaný" />
        <Tab label="Spracovaný" />
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
                  onClick={() => setDialogOpen(true)}
                >
                  Nový žiadateľ
                </Button>
              </>
            }
            data={applications.application.map((row) => [
              row.sample_code,
              row.pacient_name,
              row.personal_number,
              row.sample_collection_date,
              row.sample_receive_date,
              row.sender,
              <IconButton key={row.id} onClick={() => Router.push(`/office/${row.id}`)}>
                <EditIcon />
              </IconButton>,
              <IconButton
                key={row.id}
                onClick={() =>
                  createPdf(
                    `${row.sample_code}.pdf`,
                    getOfficeDocContent({
                      content: {
                        patientName: row.pacient_name,
                        personalNumber: row.personal_number,
                        sampleCode: row.sample_code,
                        sender: row.sender,
                        sampleCollectionDate: row.sample_collection_date,
                        sampleReceiveDate: row.sample_receive_date,
                        // TODO: need test query for this
                        testResult: '',
                        testStartDate: '',
                        testEndDate: '',
                      },
                    }),
                  )
                }
              >
                <PictureAsPdfIcon />
              </IconButton>,
            ])}
            columns={[
              'Číslo vzorky',
              'Priezvisko a meno',
              'Rodné číslo',
              'Dátum odberu',
              'Dátum príjmu',
              'Odosielateľ',
              'Upraviť',
              'Pdf',
            ]}
            options={{
              filterType: 'dropdown',
              // TODO: might consider this later
              expandableRows: false,
              responsive: 'scroll',
              // onRowsSelect: (row) => console.log('select', row),
              // onRowsExpand: (row) => console.log('expand', row),
              // onRowClick: (row) => console.log('click', row),
              // onCellClick: (row) => console.log('cell', row),
            }}
          />
        </MuiThemeProvider>
      </Paper>
      <NewApplicant open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  )
}

export default Dashboard
