import React from 'react'
import DocHeader, {DocHeaderProps} from './DocHeader'
import DocFooter, {DocFooterProps} from './DocFooter'

interface OfficeDocProps {
  header?: Partial<DocHeaderProps>
  content?: {
    // patient info
    patientName?: string
    personalNumber?: string
    sampleCode?: string
    sender?: string
    sampleCollectionDate?: string
    sampleReceiveDate?: string

    testResult?: string
    testStartDate?: string
    testEndDate?: string

    // test params
    diagnoseType?: string
    labSampleType?: string
    primarySampleType?: string
    testParameter?: React.ReactNode
    testResultFor?: string
    testMethod?: React.ReactNode
    accredited?: string
  }
  footer?: Partial<DocFooterProps>
}

const OfficeDoc = ({header = {}, content = {}, footer = {}}: OfficeDocProps) => (
  <>
    <div className="doc">
      <DocHeader
        phoneNumber={header.phoneNumber || '+421 2 49284 275/431'}
        title={header.title || 'Národné referenčné centrum pre chrípku'}
        protocolNumber={header.protocolNumber || 'č._____/2020'}
      />
      <div className="table-note">
        <strong>A</strong>-akreditovaná skúška, <strong>N</strong>-neakreditovaná skúška
      </div>
      <table className="avoid-break">
        <tbody>
          <tr>
            <td colSpan={3} className="large-line">
              <strong>Meno pacienta:</strong> {content.patientName}
            </td>
            <td>
              <strong>Rodné číslo pacienta:</strong> {content.personalNumber}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="large-line">
              <strong>Žiadateľ (meno, adresa/tel.):</strong> {content.sender}
            </td>
            <td>
              <strong>Kód vzorky</strong> (rok/CP/LC)<strong>:</strong> {content.sampleCode}
            </td>
          </tr>
          <tr>
            <td className="extra-large-line">
              <strong>Dg:</strong> {content.diagnoseType || 'Z 20.8'}
            </td>
            <td colSpan={2}>
              <strong>Druh laboratórnej vzorky:</strong> {content.labSampleType || 'TN, TT'}
            </td>
            <td>
              <strong>Typ primárnej vzorky:</strong> {content.primarySampleType || 'TN, TT'}
            </td>
          </tr>
          <tr>
            <td className="extra-large-line">
              <strong>Dátum odberu vzorky:</strong> {content.sampleCollectionDate}
            </td>
            <td>
              <strong>Dátum príjmu vzorky:</strong> {content.sampleReceiveDate}
            </td>
            <td>
              <strong>Dátum začiatku skúšky:</strong> {content.testStartDate}
            </td>
            <td>
              <strong>Dátum ukončenia skúšky:</strong> {content.testEndDate}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="avoid-break">
        <tbody>
          <tr>
            <td>
              <strong>Parameter</strong>
            </td>
            <td>
              <strong>Výsledok</strong>
            </td>
            <td>
              <strong>Metóda, kód ŠPP</strong>
            </td>
            <td>
              <strong>A/N</strong>
            </td>
          </tr>
          <tr>
            <td>
              {content.testParameter || (
                <>
                  Dôkaz NK - <br /> Respiračné vírusy
                </>
              )}
            </td>
            <td>
              {content.testResultFor || 'SARS-CoV-2'} <br /> <strong>{content.testResult}</strong>
            </td>
            <td>
              {content.testMethod || (
                <>
                  real-time RT-PCR, <br /> LM/LMD/03
                </>
              )}
            </td>
            <td>{content.accredited}</td>
          </tr>
        </tbody>
      </table>
      <DocFooter
        comment={footer.comment || '-'}
        interpretation={footer.interpretation || '-'}
        protocolDate={footer.protocolDate || ''}
        reviewedBy={
          footer.reviewedBy || (
            <>
              Mgr. Edita Staroňová, PhD.
              <br />
              NRC pre chrípku
            </>
          )
        }
        preparedBy={footer.preparedBy || 'Mgr. Edita Staroňová, PhD.'}
      />
      <div className="notes avoid-break">
        <div>Výsledky skúšok sa vzťahujú len na vzorku dodanú na OLM.</div>
        <div>
          Výsledky skúšok je možné reklamovať do 14 dní odo dňa prevzatia protokolu o skúške.
        </div>
        <div>
          Vysvetlivky: <strong>NRC</strong> – Národné referenčné centrum, <strong>CH</strong> –
          chrípka, <strong>LM</strong> – Lekárska mikrobiológia, <strong>OLM</strong> – Odbor
          lekárskej mikrobiológie,
          <strong>ŠPP</strong> – Štandardný pracovný postup, <strong>SARS-CoV-2</strong> –
          2019-Novel Coronavirus, <strong>TT, TN</strong> – tampón tonzil, tampón nosa,{' '}
          <strong>NEGAT.</strong> – negatívny, <strong>BAL</strong> – bronchoalveolárna laváž,{' '}
          <strong>BK</strong> – bunkové kultúry, <strong>NK</strong> – nukleová kyselina,{' '}
          <strong>real-time RT-PCR</strong> – real-time polymerázová reťazová reakcia predchádzaná
          reverznou transkripciou RNA do cDNA, <strong>RT-PCR</strong> – polymerázová reťazová
          reakcia predchádzaná reverznou transkripciou RNA do cDNA, <strong>LMD</strong> –
          Laboratórium molekulárnej diagnostiky, <strong>tel.</strong> telefónne číslo,{' '}
          <strong>Dg</strong> – diagnóza, <strong>CP</strong> – centrálny príjem,
          <strong>LČ</strong> – laboratórne číslo, <strong>JIS</strong> – jednotka intenzívnej
          starostlivosti
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
        border: 1px solid black;
        border-collapse: collapse;
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

export default OfficeDoc
