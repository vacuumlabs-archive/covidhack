import React from 'react'
import {createPdf} from '../utils/pdf/pdf'

interface PrintDocButtonProps {
  doc: object
  label?: string
  pdfName?: string
}

const PrintDocButton = ({doc, label = 'Print', pdfName = 'my.pdf'}: PrintDocButtonProps) => {
  const handlePrint = () => {
    createPdf(pdfName, doc)
  }

  return (
    <>
      <div onClick={handlePrint} className="button">
        {label}
      </div>
      <style jsx>{`
        .button {
          cursor: pointer;
        }
        .button:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default PrintDocButton
