import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {client} from '../../utils/gql'
import {formidablePromise} from '../../utils/backendHelper'
import {maxFileSize} from '../../utils/constants'
import {uploadFile} from '../../utils/aws'
import {serverVerificationRequestBodySchema} from '../../utils/validations'
import {sendEmail} from '../../utils/emails'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = (await formidablePromise(req, {maxFileSize})) as any
    if (form.fields.type == 'image') {
      const filename = `${Date.now().toString()}-${form.files.file.name}`
      await uploadFile(form.files.file.path, filename)
      form.fields.value = `upload/${filename}`
    }

    const validBody = await serverVerificationRequestBodySchema.validate(form.fields)
    await client.InsertVerificationRequestMutation({objects: [validBody]})
    await sendEmail(validBody.email, 'verification-requested', {
      name: `${validBody.first_name} ${validBody.last_name}`,
    })
    res.status(200).end()
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(e)
      // at this point, we would want to send why we failed the validation as well
      res.status(400).end()
    } else {
      console.error(e)
      res.status(500).end('Unauthorized')
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
