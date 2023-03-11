// lambda function to get update Item

import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateItem } from '../../helpers/businessLayer/items'
import { UpdateItemRequest } from '../../requests/UpdateItemRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('updateItem')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId
    const userId: string = getUserId(event)
    const updatedItem: UpdateItemRequest = JSON.parse(event.body)
    logger.info("Recieved updateItemRequest", updatedItem)
    const response = await updateItem(updatedItem, itemId, userId )
    logger.info(response)
    return undefined
  }
  
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
