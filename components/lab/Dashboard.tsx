
import React from 'react'
import Link from 'next/link'
import {Paper, Button} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import {GridsQuery} from '../../utils/graphqlSdk'
import {formatDate} from '../../utils/formatter'
import {createPdf, getLabDocContent} from '../../utils/pdf/pdf'
import {isNormalInteger} from '../../utils/helpers'

interface Props {
  grids: GridsQuery
}

const LabDashboard = ({grids}: Props) => {
  const printLabDoc = async (row) => {
    const labResults = await fetch(`/api/grid/${row.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())

    const samples = labResults.lab_result.map(({sample_code: sampleCode, positive}) => {
      const testResult = positive === true
        ? 'Pozitívny'
        : positive === false
          ? 'Negatívny'
          : ''
      return {sampleCode, testResult}
    }).filter(({sampleCode}) => isNormalInteger(sampleCode))

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
              <>
                <span className="button">
                  <Link href={`/edit-lab-result/${row.id}`}>
                    <Button color="primary" variant="contained">
                      Otvoriť
                    </Button>
                  </Link>
                </span>
                <span className="button">
                  <Button color="primary" variant="contained" onClick={() => printLabDoc(row)} disabled={!row.finished}>
                    Tlačiť
                  </Button>
                </span>
              </>,
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
