import { ItemsAccess } from '../dataLayer/itemsAcess'
import { ArtItem } from '../../models/ArtItem'
import { CreateItemRequest } from '../../requests/CreateItemRequest'
import * as uuid from 'uuid'
import { UpdateItemRequest } from '../../requests/UpdateItemRequest'
// import * as createError from 'http-errors'
import { createLogger } from '../../utils/logger'
import { ItemUpdate } from '../../models/ArtItemUpdate'
const logger = createLogger('todos')
// TODO: Implement businessLogic
const itemsAccess = new ItemsAccess()
export async function getPublicItem (): Promise<ArtItem[]> {
    return itemsAccess.getPublicItem()

}
export async function getItemsForUser (userId): Promise<ArtItem[]> {
    return itemsAccess.getItemsForUser(userId)
}
export async function createItem(createItemRequest: CreateItemRequest, userId: string, ): Promise<any> {
    
    // create itemId, createAT and create ArtItem
        const d = new Date()
        const itemId= uuid.v4()
        var ifpublic = 'NO'
        if (createItemRequest.public){
            ifpublic = 'YES'
        }
        const newItem = { 
            userId: userId,
            itemId: itemId,
            artist: createItemRequest.artist,
            itemname: createItemRequest.itemname,
            description: createItemRequest.description,
            uploadAt: d.toISOString(),
            type: createItemRequest.type,
            public: ifpublic,
            attachmentUrl: ''
       }
        return await itemsAccess.createItem(newItem)
    }
    

export async function updateItem(updateItemRequest: UpdateItemRequest, itemId: string, userId: string): Promise<void>{
        var ifpublic = 'NO'
        if (updateItemRequest.public){
            ifpublic = 'YES'
                }

        const itemUpdate : ItemUpdate = {
                    description: updateItemRequest.description,
                    itemname: updateItemRequest.itemname,
                    public: ifpublic
                    }

        itemsAccess.updateItem(itemUpdate, itemId, userId)

}

export async function deleteItem(itemId: string, userId :string): Promise<void>{
    itemsAccess.deleteItem(itemId, userId)
}

export async function createAttachmentPresignedUrl(itemId:string, userId:string): Promise<string> {
    const response = await itemsAccess.createAttachmentPresignedUrl(itemId, userId)
    logger.info('response item', response)
    return response
    
}