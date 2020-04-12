import {GetServerSideProps} from 'next'
import React from 'react'
import {allowAccessFor} from '../utils/auth'
import PrintDocButton from '../components/PrintDocButton'
import {getLabDocContent, getOfficeDocContent} from '../utils/pdf/pdf'

const PrintTest = () => {
  const samples = []

  for (let i = 0; i < 32; i++) {
    samples.push({sampleCode: (i + 10200).toString(10), testResult: 'neg'})
  }

  return (
    <>
      <PrintDocButton doc={getLabDocContent({content: {samples}})} label="Print Lab" pdfName="lab.pdf" />
      <PrintDocButton doc={getOfficeDocContent()} label="Print Office" pdfName="office.pdf" />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!allowAccessFor(context.req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return {
      props: {}
    }
  }
  return {
    props: {}
  }
}

export default PrintTest
