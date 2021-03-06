import { Router } from 'itty-router'
import SkillsById from './handlers/SkillsById'
import SkillsByName from './handlers/SkillsByName'
import TraitsByName from './handlers/TraitsByName'
import TraitsById from './handlers/TraitsById'

const router = Router()

router
  .get('/api/skills/names/:names', SkillsByName)
  .get('/api/traits/names/:names', TraitsByName)
  //.get('/api/items/ids/:ids', ItemsById)
  //.get('/api/items/names/:names', ItemsByName)
  .get('*', () => new Response('Not found', { status: 404 }))

export const handleRequest = (request: Request): any => router.handle(request)
