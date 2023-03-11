import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getItemsForUser } from '../../helpers/businessLayer/items'
import { getUserId } from '../utils';
// import { createLogger } from '../../utils/logger'
// const logger = createLogger('manageItems')
// Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('getting user\'s items', event)
    const userId: string = getUserId(event)
    const items = await getItemsForUser(userId)
    return {
      statusCode: 200,
      body:JSON.stringify({
        items: items
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
