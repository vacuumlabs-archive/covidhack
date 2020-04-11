import {Button, Paper, Tab, Tabs} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import React from 'react'

const Dashboard = () => {
  const [value, setValue] = React.useState(0)

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
          TODO: display tables or form depending on the selected tab
        </div>
      </Paper>
      <Button fullWidth color="primary" variant="contained">
        Nový žiadateľ
      </Button>
    </div>
  )
}

export default Dashboard
