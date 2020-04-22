import _ from 'lodash'
import pdfMake from 'pdfmake'
import {GridElement} from '../../components/DatasheetTable'
import {formatDate} from '../formatter'
import {isNormalInteger} from '../helpers'
import vfsPTSerif from './vfs_ptserif'

const NORMAL_ROW_HEIGHT = 20
const LARGE_ROW_HEIGHT = 25
const EXTRA_LARGE_ROW_HEIGHT = 35

export interface DocHeaderProps {
  phoneNumber: string
  title: string
  protocolNumber: string
}

interface DocFooterProps {
  comment: string
  interpretation: string
  protocolDate: string
  preparedBy: string
  reviewedBy: string
}

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
    testParameter?: string
    testResultFor?: string
    testMethod?: string
    accredited?: string
  }
  footer?: Partial<DocFooterProps>
}

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
    testParameter?: string
    testMethod?: string

    // test results
    samples: TestSample[]
  }
  footer?: Partial<DocFooterProps>
}

interface OfficeJournalProps {
  patientName?: string
  personalNumber?: string
  sampleCode?: string
  sender?: string
  sampleCollectionDate?: string
  sampleReceiveDate?: string
  testEndDate?: string
}

const getHeader = ({phoneNumber, title, protocolNumber}: DocHeaderProps) => [
  {text: 'ÚRAD VEREJNÉHO ZDRAVOTNÍCTVA', bold: true},
  {text: 'SLOVENSKEJ REPUBLIKY\n\n', bold: true},
  {text: 'Trnavská cesta 52', bold: true},
  {text: 'P.O.BOX 45', bold: true},
  {text: '826 45 Bratislava\n\n'},
  {text: 'Odbor lekárskej mikrobiológie', bold: true},
  {text: `tel.: ${phoneNumber}\n\n`},
  {text: title, style: 'title'},
  {text: 'Protokol o skúške', style: 'title'},
  {text: protocolNumber, style: 'title'},
  {text: '\n'},
]

const getFooter = ({
  comment,
  interpretation,
  protocolDate,
  reviewedBy,
  preparedBy,
}: DocFooterProps) => [
  {
    layout: 'noBorders',
    table: {
      dontBreakRows: true,
      widths: ['*'],
      body: [
        [
          {
            style: 'table',
            table: {
              dontBreakRows: true,
              widths: ['*'],
              heights: [LARGE_ROW_HEIGHT, LARGE_ROW_HEIGHT],
              body: [
                [`Poznámka/komentár: ${comment}`],
                [`Interpretácia výsledku: ${interpretation}`],
              ],
            },
          },
        ],
      ],
    },
  },
  {
    layout: 'noBorders',
    table: {
      dontBreakRows: true,
      widths: ['*'],
      body: [
        [
          {
            style: 'table',
            table: {
              dontBreakRows: true,
              widths: ['*', '*'],
              heights: [EXTRA_LARGE_ROW_HEIGHT, LARGE_ROW_HEIGHT],
              body: [
                [
                  `Dátum vyhotovenia protokolu o skúške:\n${protocolDate}`,
                  {
                    rowSpan: 2,
                    text: `Výsledky preskúmal a protokol o skúške uvoľnil:\n${reviewedBy}`,
                  },
                ],
                [`Vyhotovil:\n${preparedBy}`],
              ],
            },
          },
        ],
      ],
    },
  },
]

export const getLabDocContent = (props: LabDocProps = {}) => {
  const {header, content, footer} = _.merge(
    {
      header: {
        phoneNumber: '+421 2 49284 419, 407',
        title: 'Laboratórium molekulárnej diagnostiky',
        protocolNumber: 'č.           /2020/NRC pre CH (N)',
      },
      content: {
        sender: 'NRC pre chrípku',
        sampleCollectionDate: '',
        sampleReceiveDate: '',
        testStartDate: '',
        testEndDate: '',

        // test params
        labSampleType: 'tampón tonzíl, tampón nosa',
        primarySampleType: '',
        testParameter: 'Dôkaz NK SARS-CoV-2',
        testMethod: 'real-time RT-PCR\nLM/LMD/03',

        // test results
        samples: [],
      },
      footer: {
        comment: 'Bez komentára',
        interpretation: '',
        protocolDate: '',
        reviewedBy: '',
        preparedBy: '',
      },
    },
    props,
  )

  const formattedSamples = content.samples.map(({sampleCode, testResult}) => [
    sampleCode,
    content.testParameter,
    testResult,
    content.testMethod,
  ])

  return {
    content: [
      ...getHeader(header),
      {
        style: 'table',
        table: {
          widths: ['*', '*'],
          // patient info
          heights: [LARGE_ROW_HEIGHT, LARGE_ROW_HEIGHT, LARGE_ROW_HEIGHT, LARGE_ROW_HEIGHT],
          body: [
            [
              {
                colSpan: 2,
                text: [{text: 'Žiadateľ (meno, adresa/tel.): ', bold: true}, content.sender],
              },
              '',
            ],
            [
              {
                text: [{text: 'Druh laboratórnej vzorky: ', bold: true}, content.labSampleType],
              },
              {
                text: [{text: 'Typ primárnej vzorky: ', bold: true}, content.primarySampleType],
              },
            ],
            [
              {
                text: [{text: 'Dátum odberu vzorky:\n', bold: true}],
              },
              {
                text: [{text: 'Dátum príjmu vzorky:\n', bold: true}],
              },
            ],
            [
              {
                text: [{text: 'Dátum začiatku skúšky:\n', bold: true}],
              },
              {
                text: [{text: 'Dátum ukončenia skúšky:\n', bold: true}, content.testEndDate],
              },
            ],
          ],
        },
      },
      {
        style: 'table',
        table: {
          headerRows: 1,
          dontBreakRows: true,
          keepWithHeaderRows: 1,
          widths: ['*', '*', '*', '*'],
          body: [
            [
              [{text: 'Kód vzorky', bold: true}, ' (rok/LČ/NRC):'],
              {text: 'Parameter', bold: true},
              {text: 'Výsledok', bold: true},
              {text: 'Metóda, kód ŠPP', bold: true},
            ],
            ...formattedSamples,
          ],
        },
      },
      ...getFooter(footer),
      {
        style: 'notes',
        text:
          'Výsledky skúšok sa vzťahujú len na vzorku dodanú na OLM.\nVýsledky skúšok je možné reklamovať do 14 dní odo dňa prevzatia protokolu o skúške.\nVysvetlivky: LMD – Laboratórium molekulárnej diagnostiky, LM – Lekárska mikrobiológia, ŠPP – štandardný pracovný postup, NRC – Národné referenčné centrum, CH – chrípka, NK – nukleová kyselina, RT-PCR – polymerázová reťazová reakcia predchádzaná reverznou transkripciou, negat – negatívny, pozit – pozitívny, SARS – severe acute respiratory syndrome, CoV – koronavírus',
      },
    ],
  }
}

export const getOfficeDocsContent = (arrayOfProps: Array<OfficeDocProps> = [{}]) => {
  return {
    content: _.flatten(
      arrayOfProps.map((props, i) =>
        i === 0
          ? getOfficeDocContent(props).content
          : [{text: '', pageBreak: 'before'}, ...getOfficeDocContent(props).content],
      ),
    ),
  }
}

export const getOfficeDocContent = (props: OfficeDocProps = {}): any => {
  const {header, content, footer} = _.merge(
    {
      header: {
        phoneNumber: '+421 2 49284 275/431',
        title: 'Národné referenčné centrum pre chrípku',
        protocolNumber: 'č.           /2020',
      },
      content: {
        // patient info
        patientName: '',
        personalNumber: '',
        sampleCode: '',
        sender: '',
        sampleCollectionDate: '',
        sampleReceiveDate: '',

        testResult: '',
        testStartDate: '',
        testEndDate: '',

        // test params
        diagnoseType: 'Z 20.8',
        labSampleType: 'TN, TT',
        primarySampleType: 'TN, TT',
        testParameter: 'Dôkaz NK - \nRespiračné vírusy',
        testResultFor: 'SARS-CoV-2',
        testMethod: 'real-time RT-PCR,\nLM/LMD/03',
        accredited: 'N',
      },
      footer: {
        comment: '-',
        interpretation: '-',
        protocolDate: '',
        reviewedBy: 'Mgr. Edita Staroňová, PhD.\nNRC pre chrípku',
        preparedBy: 'Mgr. Edita Staroňová, PhD.',
      },
    },
    props,
  )

  return {
    content: [
      ...getHeader(header),
      {
        style: 'notes',
        margin: [0, 0, 20, 0],
        alignment: 'right',
        text: [
          {text: 'A', bold: true},
          '-akreditovaná skúška, ',
          {text: 'N', bold: true},
          '-neakreditovaná skúška',
        ],
      },
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*', '*'],
          heights: [
            LARGE_ROW_HEIGHT,
            LARGE_ROW_HEIGHT,
            EXTRA_LARGE_ROW_HEIGHT,
            EXTRA_LARGE_ROW_HEIGHT,
          ],
          body: [
            [
              {colSpan: 3, text: [{text: 'Meno pacienta:\n', bold: true}, content.patientName]},
              '',
              '',
              {text: [{text: 'Rodné číslo pacienta:\n', bold: true}, content.personalNumber]},
            ],
            [
              {
                colSpan: 3,
                text: [{text: 'Žiadateľ (meno, adresa/tel.):\n', bold: true}, content.sender],
              },
              '',
              '',
              {
                text: [
                  {text: 'Kód vzorky\n', bold: true},
                  ' (rok/CP/LČ)',
                  {text: ': ', bold: true},
                  content.sampleCode,
                ],
              },
            ],
            [
              {text: [{text: 'Dg:\n', bold: true}, content.diagnoseType]},
              {
                colSpan: 2,
                text: [{text: 'Druh laboratórnej vzorky:\n', bold: true}, content.labSampleType],
              },
              '',
              {text: [{text: 'Typ primárnej vzorky:\n', bold: true}, content.primarySampleType]},
            ],
            [
              {text: [{text: 'Dátum odberu vzorky:\n', bold: true}]},
              {text: [{text: 'Dátum príjmu vzorky:\n', bold: true}]},
              {text: [{text: 'Dátum začiatku skúšky: ', bold: true}]},
              {text: [{text: 'Dátum ukončenia skúšky: ', bold: true}, content.testEndDate]},
            ],
          ],
        },
      },
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*', LARGE_ROW_HEIGHT],
          heights: [NORMAL_ROW_HEIGHT, LARGE_ROW_HEIGHT],
          body: [
            [
              {text: 'Parameter', bold: true},
              {text: 'Výsledok', bold: true},
              {text: 'Metóda, kód ŠPP', bold: true},
              {text: 'A/N', bold: true},
            ],
            [
              content.testParameter,
              {
                text: [`${content.testResultFor}\n`, {text: content.testResult, bold: true}],
              },
              content.testMethod,
              content.accredited,
            ],
          ],
        },
      },
      ...getFooter(footer),
      {
        style: 'notes',
        text: [
          'Výsledky skúšok sa vzťahujú len na vzorku dodanú na OLM.\n',
          'Výsledky skúšok je možné reklamovať do 14 dní odo dňa prevzatia protokolu o skúške.\n',
          'Vysvetlivky: ',
          {text: 'NRC', bold: true},
          ' – Národné referenčné centrum, ',
          {text: 'CH', bold: true},
          ' – chrípka, ',
          {text: 'LM', bold: true},
          ' – Lekárska mikrobiológia, ',
          {text: 'OLM', bold: true},
          ' – Odbor lekárskej mikrobiológie, ',
          {text: 'ŠPP', bold: true},
          ' – Štandardný pracovný postup, ',
          {text: 'SARS-CoV-2', bold: true},
          ' – 2019-Novel Coronavirus, ',
          {text: 'TT, TN', bold: true},
          ' – tampón tonzil, tampón nosa, ',
          {text: 'NEGAT.', bold: true},
          ' – negatívny, ',
          {text: 'BAL', bold: true},
          ' – bronchoalveolárna laváž, ',
          {text: 'BK', bold: true},
          ' – bunkové kultúry, ',
          {text: 'NK', bold: true},
          ' – nukleová kyselina, ',
          {text: 'real-time RT-PCR', bold: true},
          ' – real-time polymerázová reťazová reakcia predchádzaná reverznou transkripciou RNA do cDNA, ',
          {text: 'RT-PCR', bold: true},
          ' – polymerázová reťazová reakcia predchádzaná reverznou transkripciou RNA do cDNA, ',
          {text: 'LMD', bold: true},
          ' – Laboratórium molekulárnej diagnostiky, ',
          {text: 'tel.', bold: true},
          ' telefónne číslo, ',
          {text: 'Dg', bold: true},
          ' – diagnóza, ',
          {text: 'CP', bold: true},
          ' – centrálny príjem, ',
          {text: 'LČ', bold: true},
          ' – laboratórne číslo, ',
          {text: 'JIS', bold: true},
          ' – jednotka intenzívnej starostlivosti',
        ],
      },
    ],
  }
}

export const getJournalContent = (entries: Array<OfficeJournalProps> = [{}, {}, {}, {}]) => {
  const BASIC_SIZE = 23

  const getSingleRecord = ({
    patientName = '',
    personalNumber = '',
    sampleCode = '',
    sender = '',
    sampleCollectionDate = '',
    sampleReceiveDate = '',
    testEndDate = '',
  }) => {
    return [
      [
        {
          layout: 'noBorders',
          table: {
            widths: ['*', '*', '*', '*'],
            heights: [
              BASIC_SIZE,
              BASIC_SIZE * 3,
              BASIC_SIZE,
              BASIC_SIZE * 2,
              BASIC_SIZE,
              BASIC_SIZE * 2,
              BASIC_SIZE * 2,
              BASIC_SIZE,
              BASIC_SIZE + 10,
            ],
            body: [
              [
                {
                  colSpan: 2,
                  text: `Odosielateľ: ${sender}`,
                },
                '',
                {
                  colSpan: 2,
                  text: `Číslo vzorky: ${sampleCode}`,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: `Priezvisko a Meno: ${patientName}`,
                },
                '',
                {
                  colSpan: 2,
                  text: `Rodné číslo: ${personalNumber}`,
                },
                '',
              ],
              ['Materiál:', 'TT/TN / iné:', 'Symptómy:', 'áno / nie'],
              ['Dg.:', '', '', ''],
              [
                {
                  colSpan: 4,
                  text: `Odber: ${sampleCollectionDate}`,
                },
                '',
                '',
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: `Príjem: ${sampleReceiveDate}`,
                },
                '',
                'Číslo protokolu: ',
                '',
              ],
              [
                {
                  colSpan: 4,
                  text: ['PCR:       ', {text: 'COVID-19', bold: true, margin: [20, 0, 0, 0]}],
                },
              ],
              [{colSpan: 4, text: 'Izolácia RNA: ' + sampleCollectionDate, margin: [45, 0, 0, 0]}],
              [
                {
                  colSpan: 4,
                  text: 'Real-Time RT-PCR SARS CoV-2: ' + testEndDate,
                  margin: [45, 0, 0, 0],
                },
              ],
            ],
          },
        },
      ],
    ]
  }

  return {
    content: [
      {
        table: {
          widths: ['*'],
          dontBreakRows: true,
          body: entries.map(getSingleRecord),
        },
      },
    ],
  }
}

export const getGridContent = (title, grid: GridElement[][]) => {
  return {
    content: [
      {text: title, style: 'title', margin: [0, 20]},
      {
        style: 'table',
        table: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          widths: grid[0].map((_) => '*'),
          heights: grid.map((_) => 25),
          body: grid.map((r) => r.map((c) => c.value)),
        },
      },
    ],
  }
}

export const createPdf = (fileName: string, props: object, orientation = 'portrait') => {
  pdfMake
    .createPdf(
      {
        pageSize: 'A4',
        pageOrientation: orientation,
        footer: (currentPage, pageCount) => [
          {
            text: `Strana ${currentPage} z ${pageCount}`,
            alignment: 'right',
            margin: [0, 0, 20, 20],
          },
        ],
        defaultStyle: {
          font: 'PTSerif',
          fontSize: 11,
        },
        styles: {
          title: {
            fontSize: 13,
            bold: true,
            alignment: 'center',
          },
          table: {
            margin: [0, 0, 0, 10],
          },
          notes: {
            fontSize: 9,
          },
        },
        ...props,
      },
      null,
      {
        PTSerif: {
          normal: 'PTSerif-Regular.ttf',
          bold: 'PTSerif-Bold.ttf',
          italics: 'PTSerif-Italic.ttf',
          bolditalics: 'PTSerif-BoldItalic.ttf',
        },
      },
      vfsPTSerif,
    )
    .download(fileName)
}

export const printLabDoc = async (grid) => {
  const labResults = await fetch(`/api/grid/${grid.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json())

  const samples = labResults.lab_result
    .filter(({sample_code}) => isNormalInteger(sample_code))
    .map(({sample_code, positive, created_at}) => {
      // This might be confusing because it's a composed string not a number. TODO: Refactor pdf
      // generator naming.
      const sampleCode = `${created_at.substr(2, 2)}/${sample_code}/CH`
      const testResult = positive === true ? 'pozitívny' : 'negatívny'
      return {sampleCode, testResult, rawSampleCode: sample_code}
    })

  samples.sort(({rawSampleCode: a}, {rawSampleCode: b}) => parseInt(a) - parseInt(b))

  createPdf(
    `lab-${grid.id}.pdf`,
    getLabDocContent({
      content: {
        sampleCollectionDate: formatDate(grid.sample_taken_date),
        sampleReceiveDate: formatDate(grid.sample_arrival_date),
        testStartDate: formatDate(grid.test_initiation_date),
        testEndDate: formatDate(grid.test_finished_date),
        samples,
      },
    }),
  )
}
