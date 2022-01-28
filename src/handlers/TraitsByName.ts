import { Request } from 'itty-router'
import TraitsStore from '../stores/traitStore'

const TraitsByName = async (request: Request): Promise<Response> => {
  const traitsStore = new TraitsStore()
  const names = request?.params?.names.split(',') || []

  const body = JSON.stringify(await traitsStore.findByName(names))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(body, { headers })
}

export default TraitsByName
