
import React from 'react'
import Link from 'next/link'
import {Paper, Button} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import {GridsQuery} from '../../utils/graphqlSdk'
import {formatDate} from '../../utils/formatter'

interface Props {
  grids: GridsQuery
}

const LabDashboard = ({grids}: Props) => {
  return (
    <div style={{margin: 16}}>
      <div>
        <Link href="/create-lab-result">
          <Button
            style={{
              margin: '10px',
              padding: '8px 16px !important',
            }}
            color="primary"
            variant="contained"
          >
            Nová mriežka
          </Button>
        </Link>
      </div>
      <Paper style={{marginBottom: 16}}>
        <MUIDataTable
          title={'Mriežky'}
          data={grids.grid.map((row) => [
            row.title,
            formatDate(row.sample_taken_date),
            formatDate(row.sample_arrival_date),
            formatDate(row.test_initiation_date),
            formatDate(row.test_finished_date),
            <Link href={`/edit-lab-result/${row.id}`}>
              <Button
                style={{
                  margin: '10px',
                  padding: '8px 16px !important',
                }}
                color="primary"
                variant="contained"
              >
                Otvoriť
              </Button>
            </Link>,
          ])}
          columns={[
            'Meno',
            'Dátum odberu',
            'Dátum príjmu',
            'Dátum začiatku skúšky',
            'Dátum ukončenia skúšky',
            '',
          ]}
          options={{
            filterType: 'dropdown',
            responsive: 'scroll',
          }}
        />
      </Paper>
    </div>
  )
}

export default LabDashboard
