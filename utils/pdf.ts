import pdf from 'dynamic-html-pdf'
import fs from 'fs'
import {Registration_Request, Verification_Request} from './graphqlSdk'
import calculatePrice from './price'
import {client} from './gql'
import {invoiceBaseId} from './constants'
import moment from 'moment'
import {uploadFile} from './aws'

pdf.registerHelper('ifIsBusiness', function(applicant_person_type, options) {
  if (['legal', 'physical-contractor'].indexOf(applicant_person_type) !== -1) {
    return options.fn(this)
  }
  return options.inverse(this)
})

pdf.registerHelper('ifNotEmpty', function(value, options) {
  if (value != null) {
    return options.fn(this)
  }
  return options.inverse(this)
})

const createPdf = async (template: string, context: object) => {
  const path = `/tmp/pdf/${Date.now().toString()}/output.pdf`
  const document = {
    type: 'file',
    template: fs.readFileSync(template, 'utf8'),
    context: {
      ...context,
    },
    path: path,
  }

  const options = {
    format: 'A4',
    orientation: 'portrait',
  }

  return pdf.create(document, options)
}

export const generatePdf = (type, context) => {
  let template

  switch (type) {
    case 'delegation':
      template = './utils/pdf-templates/delegation.html'
      break
  }
  switch (type) {
    case 'invoice':
      template = './utils/pdf-templates/invoice.html'
      break
  }
  return createPdf(template, context)
}

export const generateRegistrationDocuments = async (
  verification: Verification_Request,
  registration: Registration_Request,
) => {
  const price = calculatePrice(verification, registration)

  const currentYear = new Date().getFullYear()
  const maxInvoiceId = (await client.maximumInvoiceIdQuery({year: currentYear})).invoice_aggregate
    .aggregate.max.id
  const invoiceId = invoiceBaseId + maxInvoiceId + 1

  const orderDate = moment(registration.created_at)
  const paymentDate = moment(registration.created_at).add(5, 'days')

  const data = {
    ...registration,
    ...{invoiceId: invoiceId},
    ...price,
    orderDate: orderDate.format('DD.MM.YYYY'),
    paymentDate: paymentDate.format('DD.MM.YYYY'),
  }

  const invoiceFile = await generatePdf('invoice', data)
  await uploadFile(invoiceFile.filename, `generated/${registration.id}_invoice.pdf`)

  await client.InsertInvoiceMutation({
    id: maxInvoiceId + 1,
    year: currentYear,
    registration_request_id: registration.id,
  })

  const delegationFile = await generatePdf('delegation', registration)
  await uploadFile(delegationFile.filename, `generated/${registration.id}_delegation.pdf`)
}
