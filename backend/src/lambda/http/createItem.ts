// lambda function to creatItem in the database and S3 bucket

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateItemRequest } from '../../requests/CreateItemRequest'
import { getUserId } from '../utils';
import { createItem } from '../../helpers/businessLayer/items'
import { createLogger } from '../../utils/logger'
const logger = createLogger('createItem')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('Creating Item', event)
    const newItem: CreateItemRequest = JSON.parse(event.body)
      const userId: string = getUserId(event)
      const item= await createItem(newItem, userId)
      logger.info('item created' , item)
      return {
        statusCode: 200,
        body: 
        JSON.stringify({
        item: item})
      }
    }
)

handler.use(
  cors({
    credentials: true
  })
)
