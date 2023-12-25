import process from 'node:process'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())
const todoTable = process.env.TODOS_TABLE
const todoIndex = process.env.CREATED_AT_INDEX

export async function putTodoItem(item) {
  await dynamoDbClient.put({
    TableName: todoTable,
    Item: item
  })
}

export async function queryTodoItems(userId) {
  const { Items } = await dynamoDbClient.query({
    TableName: todoTable,
    IndexName: todoIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  })

  return Items
}

export async function updateTodoItem(item) {
  await dynamoDbClient.update({
    TableName: todoTable,
    Key: {
      userId: item.userId,
      todoId: item.todoId
    },
    UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': item.name,
      ':dueDate': item.dueDate,
      ':done': item.done
    }
  })
}

export async function updateAttachmentUrlItem(userId, todoId, attachmentUrl) {
  await dynamoDbClient.update({
    TableName: todoTable,
    Key: {
      userId,
      todoId
    },
    UpdateExpression: 'set attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
      ':attachmentUrl': attachmentUrl
    }
  })
}

export async function deleteTodoItem(userId, todoId) {
  await dynamoDbClient.delete({
    TableName: todoTable,
    Key: {
      userId,
      todoId
    }
  })
}

export async function getTodoItem(userId, todoId) {
  const { Item } = await dynamoDbClient.get({
    TableName: todoTable,
    Key: {
      userId,
      todoId
    }
  })

  return Item
}
