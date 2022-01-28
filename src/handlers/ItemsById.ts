import { Request } from 'itty-router'
import ItemsStore from '../stores/itemStore'

const ItemsById = async (request: Request): Promise<Response> => {
  const itemsStore = new ItemsStore()
  const ids =
    request?.params?.ids.split(',').map((strId) => parseInt(strId, 10)) || []

  const body = JSON.stringify(await itemsStore.find(ids))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(body, { headers })
}

export default ItemsById
