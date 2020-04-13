import {Button, IconButton, Paper} from '@material-ui/core'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import MUIDataTable from 'mui-datatables'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import {formatDate} from '../../utils/formatter'
import {GridsQueryQuery} from '../../utils/graphqlSdk'
import {printLabDoc} from '../../utils/pdf/pdf'

interface Props {
  grids: GridsQueryQuery
}

const tableMuiTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolbar: {
      left: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    MuiTableCell: {
      root: {
        padding: '0 16px !important',
      },
    },
  } as any,
})

const LabDashboard = ({grids}: Props) => {
  return (
    <>
      <div className="add-margin">
        <div className="add-margin">
          <Link href="/create-lab-result">
            <Button className="button" color="primary" variant="contained">
              Nová mriežka
            </Button>
          </Link>
        </div>
        <Paper className="add-margin">
          <MuiThemeProvider theme={tableMuiTheme}>
            <MUIDataTable
              title={'Mriežky'}
              data={grids.grid.map((row) => [
                row.title,
                formatDate(row.test_initiation_date),
                row.test_finished_date ? formatDate(row.test_finished_date) : '',
                row.finished ? 'ukončená' : 'prebieha',
                <IconButton
                  key={row.id}
                  onClick={() => Router.push('/edit-lab-result/[id]', `/edit-lab-result/${row.id}`)}
                >
                  <EditIcon />
                </IconButton>,
                row.finished ? (
                  <IconButton key={row.id} onClick={() => printLabDoc(row)}>
                    <PictureAsPdfIcon />
                  </IconButton>
                ) : (
                  ''
                ),
              ])}
              columns={[
                'Meno',
                'Dátum začiatku skúšky',
                'Dátum ukončenia skúšky',
                'Stav',
                'Upraviť',
                'Protokol',
              ]}
              options={{
                filterType: 'dropdown',
                selectableRows: false,
                expandableRows: false,
                responsive: 'scrollFullHeight',
                print: false,
                download: false,
                pagination: false,
                filter: false,
                viewColumns: false,
              }}
            />
          </MuiThemeProvider>
        </Paper>
      </div>
      <style jsx>{`
        .add-margin {
          margin: 16px;
        }
        .button {
          margin: 0 8px;
        }
      `}</style>
    </>
  )
}

export default LabDashboard
