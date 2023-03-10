
/**
 * Fields in a request to create a single Item item.
 */
export interface CreateItemRequest {
  artist: string
  itemname: string
  description: string
  public: boolean
  type: string
}
