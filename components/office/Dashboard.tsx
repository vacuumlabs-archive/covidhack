import {Button, Paper, Tab, Tabs} from '@material-ui/core'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/styles'
import MUIDataTable from 'mui-datatables'
import React, {useState} from 'react'
import {ApplicationsQueryQuery} from '../../utils/graphqlSdk'
import NewApplicant from './NewApplicant'

const useStyles = makeStyles({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  newApplicant: {
    position: 'absolute',
    left: 187,
    top: 150,
    zIndex: 1,
  },
})

const tableMuiTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        height: '63vh',
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
      <Button
        variant="contained"
        color="primary"
        className={classes.newApplicant}
        onClick={() => setDialogOpen(true)}
      >
        Nový žiadateľ
      </Button>

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
            title={'Zoznam záznamov'}
            data={applications.application.map((row) => [
              row.sample_code,
              row.pacient_name,
              row.personal_number,
              row.sample_collection_date,
              row.sample_receive_date,
              row.sender,
            ])}
            columns={[
              'Číslo vzorky',
              'Priezvisko a meno',
              'Rodné číslo',
              'Dátum odberu',
              'Dátum príjmu',
              'Odosielateľ',
            ]}
            options={{
              filterType: 'dropdown',
              responsive: 'scroll',
            }}
          />
        </MuiThemeProvider>
      </Paper>
      <NewApplicant open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  )
}

export default Dashboard
