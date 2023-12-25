import { generateUploadUrl, updateAttachmentUrl } from '../service/todo.js'
import { getUserId } from '../utils.mjs'

export const handler = async (event) => {
  console.log('Event: ', event)

  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId

  const { uploadId, s3UploadUrl } = await generateUploadUrl()
  await updateAttachmentUrl(userId, todoId, uploadId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: s3UploadUrl
    })
  }
}
