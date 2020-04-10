require('dotenv').config()
import aws from 'aws-sdk'
import fs from 'fs'
import {isDevelopment} from './backendHelper'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new aws.S3()

// adapted from https://www.mydatahack.com/uploading-and-downloading-files-in-s3-with-node-js/
export const uploadFile = async (source: string, targetName: string) => {
  console.log(`Preparing to upload ${source} as ${targetName} to S3`)
  const filedata = await fs.promises.readFile(source)
  const key = isDevelopment ? `testing/upload/${targetName}` : `upload/${targetName}`
  const putParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: filedata,
  }
  await s3.putObject(putParams).promise()
}

// adapted from https://www.mydatahack.com/uploading-and-downloading-files-in-s3-with-node-js/
export const downloadFile = async (key: string) => {
  console.log(`Preparing to retrieve ${key} from S3`)
  const getParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: isDevelopment ? `testing/${key}` : key,
  }
  return s3.getObject(getParams).createReadStream()
}

export const downloadFileBase64 = async (key: string) => {
  console.log(`Preparing to retrieve ${key} from S3`)
  const getParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: isDevelopment ? `testing/${key}` : key,
  }
  return new Promise((resolve, reject) => {
    s3.getObject(getParams, function(error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data.Body.toString('base64'))
      }
    })
  })
}
