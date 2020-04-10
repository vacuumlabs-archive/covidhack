require('dotenv').config()
import mail from '@sendgrid/mail'

mail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (receiver, status, context = {}, attachments?) => {
  let templateId
  switch (status) {
    case 'approved':
      templateId = 'd-7ef3531557fc4687b5fb1c44883c6525'
      break
    case 'dismissed':
      templateId = 'd-04da73e727264cd98b6b972e2e567b78'
      break
    case 'verification-requested':
      templateId = 'd-848b480c52f5458abe457ebc031a4c91'
      break
    case 'order-requested':
      templateId = 'd-03e5f9e99eda46f7a4a1dd4ec1a734fc'
      break
  }

  try {
    await mail.send({
      to: receiver,
      from: 'hello@tramatm.com',
      templateId: templateId,
      dynamicTemplateData: {
        ...context,
      },
      attachments: attachments,
    })
  } catch (e) {
    console.log(e)
  }
}
