import {Button, Paper, Tab, Tabs} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import React, {useState} from 'react'
import NewApplicant from './NewApplicant'

const Dashboard = () => {
  const [value, setValue] = React.useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div style={{margin: 16}}>
      <Paper style={{marginBottom: 16, border: '1px solid gray'}}>
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
          <Tab label="Nespárovaný" icon={<WarningIcon color="secondary" />} />
          <Tab label="Neotestovaný" icon={<WarningIcon color="secondary" />} />
          <Tab label="Otestovaný" icon={<WarningIcon />} />
          <Tab label="Spracovaný" icon={<WarningIcon />} />
        </Tabs>
        <div style={{height: 'calc(100vh - 250px)'}}>
          TODO: display tables depending on the selected tab
        </div>
      </Paper>
      <Button fullWidth color="primary" variant="contained" onClick={() => setDialogOpen(true)}>
        Nový žiadateľ
      </Button>
      <NewApplicant open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  )
}

export default Dashboard
