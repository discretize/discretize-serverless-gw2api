import { Request } from 'itty-router'
import SkillsStore from '../stores/skillStore'

const SkillsByName = async (request: Request): Promise<Response> => {
  const skillsStore = new SkillsStore()
  const names = request?.params?.names.split(',') || []

  const body = JSON.stringify(await skillsStore.findByName(names))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(body, { headers })
}

export default SkillsByName
