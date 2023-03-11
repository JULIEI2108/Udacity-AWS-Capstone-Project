// datalayer for ItemsAccess,
import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { Json } from 'aws-sdk/clients/robomaker';
import { createLogger } from '../../utils/logger'
import { ArtItem } from '../../models/ArtItem'
import { ItemUpdate } from '../../models/ArtItemUpdate';
import { createAttachmentPresignedUrl, deleteItemImage } from './attachmentUtils'
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
// const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('ItemsAccess')

export class ItemsAccess {
    constructor(
        private readonly doClient: DocumentClient = createDynamoDBClient(),
        private readonly itemsTable = process.env.ITEMS_TABLE,
        private readonly itemsIndexTable = process.env.ITEMS_PUBLIC_INDEX) {

    }
    // use query function to search for all public item
    async getPublicItem(): Promise<ArtItem[]> {
        console.log('Getting Public Item')

        const result = await this.doClient.query({
            TableName: this.itemsTable,
            IndexName: this.itemsIndexTable,
            KeyConditionExpression: '#c = :x',
            ExpressionAttributeValues: {
                ':x': 'YES'
            },
            ExpressionAttributeNames: {
                '#c': 'public',
                '#d': 'type'

            },
            ProjectionExpression: "itemId, artist, itemname, description, #d, uploadAt, #c, attachmentUrl"
        }).promise()

        const items = result.Items
        return items as ArtItem[]
    }


    async getItemsForUser(userId): Promise<ArtItem[]> {
        logger.info('Getting user items userId: ', { userId })

        // use query function to search for current user's item
        const result = await this.doClient.query({
            TableName: this.itemsTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ExpressionAttributeNames: {
                '#c': 'public',
                '#d': 'type'
            },
            ProjectionExpression: "itemId, artist, itemname, description, #d, uploadAt, #c, attachmentUrl"
        }).promise()
        console.log('items', result)
        const items = result.Items
        return items as ArtItem[]
    }
    // use put to input data in Dynamodb
    async createItem(newItem: ArtItem): Promise<any> {
        logger.info('creating a new ArtItem with id', newItem.itemId)
        await this.doClient.put({
            TableName: this.itemsTable,
            Item: newItem
        }).promise()
        //create response for frontend
        const response: any = {
            itemId: newItem.itemId,
            artist: newItem.artist,
            uploadAt: newItem.uploadAt,
            itemname: newItem.itemname,
            description: newItem.description,
            type: newItem.type,
            public: newItem.public
        }

        logger.info('item', response)
        return response
    }
    async updateItem(update: ItemUpdate, itemId, userId): Promise<any> {
        // update dynamodb table
        var params = {
            TableName: this.itemsTable,
            Key: {
                'itemId': itemId,
                'userId': userId
            },
            ExpressionAttributeNames: {
                '#c': 'public'
            },
            UpdateExpression: "set itemname= :x, description = :y,  #c = :z",
            ExpressionAttributeValues: {
                ':x': update.itemname,
                ':y': update.description,
                ':z': update.public
            }
        };
        // use update function to update data in DynamoDB
        const response = await this.doClient.update(params, function (err, data) {
            if (err) logger.error(err.message)
            else console.log(data)
        })
        return response
    }
    async deleteItem(itemId: string, userId): Promise<void> {
        //delete todoItem in dynamoDB table
        var params = {
            TableName: this.itemsTable,
            Key: {
                'itemId': itemId,
                'userId': userId
            }
        }
        // use delete function to delete item in DynamoDB
        await this.doClient.delete(params, function (err, data) {
            if (err) logger.error(err)
            else logger.info(data)
        })
        // delete itemImage in S3
        await deleteItemImage(itemId)
    }

    // get uploadURL from s3 bucket
    async createAttachmentPresignedUrl(itemId: string, userId: string): Promise<any> {
        const response = await createAttachmentPresignedUrl(itemId)
        // update dynamoDB with new attachmentUrl
        var params = {
            TableName: this.itemsTable,
            Key: {
                'itemId': itemId,
                'userId': userId
            },
            UpdateExpression: "set  attachmentUrl = :x",
            ExpressionAttributeValues: {
                ':x': response.attachmentUrl
            }
        }
        logger.info('attachmentUrl', response.attachmentUrl)
        await this.doClient.update(params, function (err, data) {
            if (err) logger.error(err)
            else logger.log('info', data)
        })
        return response['uploadUrl']
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}