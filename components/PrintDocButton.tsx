import React, {useRef} from 'react'

let html2pdf = null

if (typeof window !== 'undefined') {
  import('html2pdf.js').then((module) => {
    html2pdf = module.default
  })
}

interface PrintDocButtonProps {
  doc: React.ReactNode
  label?: string
  pdfName?: string
}

const PrintDocButton = ({doc, label = 'Print', pdfName = 'my.pdf'}: PrintDocButtonProps) => {
  const refPrintable = useRef(null)

  const handlePrint = () => {
    html2pdf()
      .set({
        filename: pdfName,
        margin: 20,
        image: {type: 'jpeg', quality: 1},
        html2canvas: {scale: 2},
        jspdf: {orientation: 'portrait', format: 'A4'},
      })
      .from(refPrintable.current)
      .toPdf()
      .get('pdf')
      .then(function(pdf) {
        const totalPages = pdf.internal.getNumberOfPages()
        const {width, height} = pdf.internal.pageSize

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          pdf.setFontSize(10)
          pdf.text(width - 20, height - 10, `Strana ${i} z ${totalPages}`, {align: 'right'})
        }
      })
      .save()
  }

  return (
    <>
      <div onClick={handlePrint} className="button">{label}</div>
      <div className="hide" style={{display: 'none'}}>
        <div ref={refPrintable}>{doc}</div>
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
