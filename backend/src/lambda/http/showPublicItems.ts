// lambda function to get all public Item

import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getPublicItem  } from '../../helpers/businessLayer/items'
import { createLogger } from '../../utils/logger'
const logger = createLogger('showPublicItems')
// Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('getting public items', event)
    const items = await getPublicItem()
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
