import { Request } from 'itty-router'
import TraitsStore from '../stores/traitStore'

const TraitsById = async (request: Request): Promise<Response> => {
  const traitsStore = new TraitsStore()
  const ids =
    request?.params?.ids.split(',').map((strId) => parseInt(strId, 10)) || []

  const body = JSON.stringify(await traitsStore.find(ids))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(body, { headers })
}

export default TraitsById
