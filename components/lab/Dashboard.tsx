import {Button, Paper, IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import Done from '@material-ui/icons/Done'
import MUIDataTable from 'mui-datatables'
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import {formatDate} from '../../utils/formatter'
import {GridsQueryQuery} from '../../utils/graphqlSdk'
import {isNormalInteger} from '../../utils/helpers'
import {createPdf, getLabDocContent} from '../../utils/pdf/pdf'

interface Props {
  grids: GridsQueryQuery
}

const LabDashboard = ({grids}: Props) => {
  const printLabDoc = async (row) => {
    const labResults = await fetch(`/api/grid/${row.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())

    const samples = labResults.lab_result
      .map(({sample_code: sampleCode, positive}) => {
        const testResult = positive === true ? 'Pozitívny' : 'Negatívny'
        return {sampleCode, testResult}
      })
      .filter(({sampleCode}) => isNormalInteger(sampleCode))

    samples.sort(({sampleCode: a}, {sampleCode: b}) => parseInt(a) - parseInt(b))

    createPdf(
      `lab-${row.id}.pdf`,
      getLabDocContent({
        content: {
          sampleCollectionDate: formatDate(row.sample_taken_date),
          sampleReceiveDate: formatDate(row.sample_arrival_date),
          testStartDate: formatDate(row.test_initiation_date),
          testEndDate: formatDate(row.test_finished_date),
          samples,
        },
      }),
    )
  }

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
          <MUIDataTable
            title={'Mriežky'}
            data={grids.grid.map((row) => [
              row.title,
              formatDate(row.sample_taken_date),
              formatDate(row.sample_arrival_date),
              formatDate(row.test_initiation_date),
              formatDate(row.test_finished_date),
              row.finished ? <Done style={{color: '#61d800'}} /> : <></>,
              <IconButton
                key={row.id}
                onClick={() => Router.push('/edit-lab-result/[id]', `/edit-lab-result/${row.id}`)}
              >
                <EditIcon />
              </IconButton>,
              <IconButton key={row.id} onClick={() => printLabDoc(row)} disabled={!row.finished} >
                <PictureAsPdfIcon />
              </IconButton>,
            ])}
            columns={[
              'Meno',
              'Dátum odberu',
              'Dátum príjmu',
              'Dátum začiatku skúšky',
              'Dátum ukončenia skúšky',
              'Dokončená',
              'Upraviť',
              'Pdf',
            ]}
            options={{
              filterType: 'dropdown',
              responsive: 'scroll',
            }}
          />
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
