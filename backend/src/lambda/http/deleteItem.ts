import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteItem } from '../../helpers/businessLayer/items'
import { getUserId } from '../utils'
// import { createLogger } from '../../utils/logger'
// const logger = createLogger('deleteItem')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId
    console.log('info', 'starting to delete item, {itemId}')
    const userId: string = getUserId(event)
    await deleteItem(itemId, userId)
    
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
