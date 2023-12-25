import { updateTodo } from '../service/todo.js'
import { getUserId } from '../utils.mjs'

export const handler = async (event) => {
  console.log('Event: ', event)

  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId
  const payload = JSON.parse(event.body)

  await updateTodo(userId, todoId, payload)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
