import { Request } from 'itty-router'
import SkillsStore from '../stores/skillStore'

const SkillsById = async (request: Request): Promise<Response> => {
  const skillsStore = new SkillsStore()
  const ids =
    request?.params?.ids.split(',').map((strId) => parseInt(strId, 10)) || []

  const body = JSON.stringify(await skillsStore.find(ids))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  }
  return new Response(body, { headers })
}

export default SkillsById
