import {
  Button,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
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
    marginLeft: 'auto',
    padding: '8px 16px',
  },
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
      <div className={classes.titleWrapper}>
        <Typography variant="h3" style={{display: 'inline-block'}}>
          Zoznam záznamov
        </Typography>
        <Button
          className={classes.newApplicant}
          color="primary"
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Nový žiadateľ
        </Button>
      </div>

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
        <TableContainer component={Paper} style={{height: 'calc(100vh - 250px)'}}>
          <Table size="small">
            <TableHead style={{backgroundColor: 'lightgrey'}}>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.application.map((row) => (
                <TableRow key={row.id}>
                  <TableCell scope="row">{row.pacient_name}</TableCell>
                  <TableCell align="right">{row.personal_number}</TableCell>
                  <TableCell align="right">{row.sample_code}</TableCell>
                  <TableCell align="right">{row.sample_collection_date}</TableCell>
                  <TableCell align="right">{row.sample_receive_date}</TableCell>
                  <TableCell align="right">{row.sender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <NewApplicant open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  )
}

export default Dashboard
