import { v4 as uuidv4 } from 'uuid'
import {
  deleteTodoItem,
  getTodoItem,
  putTodoItem,
  queryTodoItems,
  updateTodoItem,
  updateAttachmentUrlItem
} from '../data/db.js'
import { getAttachmentUrl, getSignedUrl } from '../data/storage.js'

export async function createTodo(userId, payload) {
  const item = {
    ...payload,
    userId,
    todoId: uuidv4(),
    attachmentUrl: null,
    done: false,
    createdAt: new Date().getTime().toString()
  }

  await putTodoItem(item)

  return item
}

export async function getTodos(userId) {
  return await queryTodoItems(userId)
}

export async function updateTodo(userId, todoId, payload) {
  const item = getTodoItem(userId, todoId)
  if (!item) throw new Error('Not found')

  const nextItem = {
    ...payload,
    userId,
    todoId
  }
  await updateTodoItem(nextItem)
}

export async function generateUploadUrl() {
  const uploadId = uuidv4()
  return {
    uploadId,
    s3UploadUrl: await getSignedUrl(uploadId)
  }
}
export async function deleteTodo(userId, todoId) {
  const item = getTodoItem(userId, todoId)
  if (!item) throw new Error('Not found')

  await deleteTodoItem(userId, todoId)
}

export async function updateAttachmentUrl(userId, todoId, uploadId) {
  const item = await getTodoItem(userId, todoId)
  if (!item) throw new Error('Not found')

  const attachmentUrl = await getAttachmentUrl(uploadId)
  await updateAttachmentUrlItem(userId, todoId, attachmentUrl)
}
