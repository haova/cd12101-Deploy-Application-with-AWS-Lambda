import { createTodo } from '../service/todo.js'
import { getUserId } from '../utils.mjs'

export const handler = async (event) => {
  console.log('Event: ', event)

  const userId = getUserId(event)
  const payload = JSON.parse(event.body)

  const item = await createTodo(userId, payload)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item
    })
  }
}
