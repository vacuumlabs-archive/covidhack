import React from 'react'

export interface DocFooterProps {
  comment: string
  interpretation: string
  protocolDate: string
  preparedBy: string
  reviewedBy: React.ReactNode
}

const DocFooter = ({
  comment,
  interpretation,
  protocolDate,
  preparedBy,
  reviewedBy,
}: DocFooterProps) => (
  <>
    <table className="avoid-break">
      <tbody>
        <tr>
          <td className="medium-line">Poznámka/komentár: {comment}</td>
        </tr>
        <tr>
          <td className="medium-line">Interpretácia výsledku: {interpretation}</td>
        </tr>
      </tbody>
    </table>
    <table className="avoid-break">
      <tbody>
        <tr>
          <td className="large-line">
            Dátum vyhotovenia protokolu o skúške:
            <br />
            {protocolDate}
          </td>
          <td rowSpan={2}>
            Výsledky preskúmal a protokol o skúške uvoľnil:
            <br />
            {reviewedBy}
          </td>
        </tr>
        <tr>
          <td className="large-line">
            Vyhotovil:
            <br />
            {preparedBy}
          </td>
        </tr>
      </tbody>
    </table>
    <style jsx>{`
      .avoid-break {
        page-break-inside: avoid;
      }

      table {
        width: 100%;
        table-layout: fixed;
        margin-bottom: 1.5em;
        border: 1px solid black;
        border-collapse: collapse;
      }
      td {
        page-break-inside: avoid;
        border: 1px solid black;
        padding: 2px;
        vertical-align: top;
      }
      .medium-line {
        height: 2em;
      }
      .large-line {
        height: 3em;
      }
    `}</style>
  </>
)

export default DocFooter
