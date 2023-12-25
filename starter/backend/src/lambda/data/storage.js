import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner'

const bucketName = process.env.UPLOAD_S3_BUCKET
const client = new S3Client({
  signatureVersion: 'v4',
  region: process.env.S3_REGION,
  params: { Bucket: bucketName }
})

export async function getSignedUrl(uploadId) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uploadId
  })

  return await s3GetSignedUrl(client, command, {
    expiresIn: 1000
  })
}

export async function getAttachmentUrl(uploadId) {
  return `https://${bucketName}.s3.amazonaws.com/${uploadId}`
}
