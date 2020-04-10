import React from 'react'
import DocHeader, {DocHeaderProps} from './DocHeader'
import DocFooter, {DocFooterProps} from './DocFooter'

interface TestSample {
  sampleCode: string
  testResult: string
}

interface LabDocProps {
  header?: Partial<DocHeaderProps>
  content?: {
    // patient info
    sender?: string
    sampleCollectionDate?: string
    sampleReceiveDate?: string
    testStartDate?: string
    testEndDate?: string

    // test params
    labSampleType?: string
    primarySampleType?: string
    testParameter?: React.ReactNode
    testMethod?: React.ReactNode

    // test results
    samples: TestSample[]
  }
  footer?: Partial<DocFooterProps>
}

const LabDoc = ({header = {}, content = {samples: []}, footer = {}}: LabDocProps) => (
  <>
    <div className="doc">
      <DocHeader
        phoneNumber={header.phoneNumber || '+421 2 49284 419, 407'}
        title={header.title || 'Laboratórium molekulárnej diagnostiky'}
        protocolNumber={header.protocolNumber || 'č. 152/2020/NRC pre CH (N)'}
      />
      <table className="avoid-break">
        <tbody>
          <tr>
            <td colSpan={2} className="large-line">
              <strong>Žiadateľ (meno, adresa/tel.):</strong> {content.sender || 'NRC pre chrípku'}
            </td>
          </tr>
          <tr>
            <td className="large-line">
              <strong>Druh laboratórnej vzorky:</strong>{' '}
              {content.labSampleType || 'tampón tonzíl, tampón nosa'}
            </td>
            <td>
              <strong>Typ primárnej vzorky:</strong> {content.primarySampleType}
            </td>
          </tr>
          <tr>
            <td className="large-line">
              <strong>Dátum odberu vzorky:</strong> {content.sampleCollectionDate}
            </td>
            <td>
              <strong>Dátum príjmu vzorky:</strong> {content.sampleReceiveDate}
            </td>
          </tr>
          <tr>
            <td className="large-line">
              <strong>Dátum začiatku skúšky:</strong> {content.testStartDate}
            </td>
            <td>
              <strong>Dátum ukončenia skúšky:</strong> {content.testEndDate}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Kód vzorky</strong> (rok/CP/LC):
            </td>
            <td>
              <strong>Parameter</strong>
            </td>
            <td>
              <strong>Výsledok</strong>
            </td>
            <td>
              <strong>Metóda, kód ŠPP</strong>
            </td>
          </tr>
          {content.samples.map(({sampleCode, testResult}) => (
            <tr key={sampleCode}>
              <td>{sampleCode}</td>
              <td>{content.testParameter || 'Dôkaz NK SARS-CoV-2'}</td>
              <td>{testResult || 'negatívny'}</td>
              <td>
                {content.testMethod || (
                  <>
                    real-time RT-PCR
                    <br /> LM/LMD/03
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DocFooter
        comment={footer.comment || 'Bez komentára'}
        interpretation={footer.interpretation || ''}
        protocolDate={footer.protocolDate || ''}
        reviewedBy={footer.reviewedBy || ''}
        preparedBy={footer.preparedBy || ''}
      />
      <div className="notes avoid-break">
        <div>Výsledky skúšok sa vzťahujú len na vzorku dodanú na OLM.</div>
        <div>
          Výsledky skúšok je možné reklamovať do 14 dní odo dňa prevzatia protokolu o skúške.
        </div>
        <div>
          Vysvetlivky: LMD – Laboratórium molekulárnej diagnostiky, LM – Lekárska mikrobiológia, ŠPP
          – štandardný pracovný postup, NRC – Národné referenčné centrum, CH – chrípka, NK –
          nukleová kyselina, RT-PCR – polymerázová reťazová reakcia predchádzaná reverznou
          transkripciou, negat – negatívny, pozit – pozitívny, SARS – severe acute respiratory
          syndrome, CoV – koronavírus
        </div>
      </div>
    </div>
    <style jsx>{`
      .doc {
        width: 168mm;
        font-family: Georgia, serif;
        font-size: 14px;
      }

      .avoid-break {
        page-break-inside: avoid;
      }

      table {
        width: 100%;
        table-layout: fixed;
        margin-bottom: 1.5em;
        border-collapse: collapse;
      }
      tr {
        page-break-inside: avoid;
      }
      td {
        page-break-inside: avoid;
        border: 1px solid black;
        padding: 3px;
        vertical-align: top;
      }
      .extra-large-line {
        height: 4em;
      }
      .large-line {
        height: 3em;
      }
      .table-note {
        padding-right: 3em;
        font-size: 12px;
        text-align: right;
      }
      .notes {
        font-size: 12px;
      }
      .todo {
        color: red;
        font-weight: bold;
      }
    `}</style>
  </>
)

export default LabDoc
