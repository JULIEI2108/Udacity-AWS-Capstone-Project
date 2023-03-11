// lambda function to get uploadurl from s3 bucket
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createAttachmentPresignedUrl } from '../../helpers/businessLayer/items'
import { getUserId } from '../utils'
// import { createLogger } from '../../utils/logger'
// const logger = createLogger('generateUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId
    const userId: string = getUserId(event)
    const response = await createAttachmentPresignedUrl(itemId, userId)
    console.log('response handler',response)
    return {
        statusCode: 200,
        body:JSON.stringify({
          uploadUrl: response
        })
      }
  }
)

handler  
    .use(httpErrorHandler())
    .use(
    cors({
      credentials: true
    })
  )