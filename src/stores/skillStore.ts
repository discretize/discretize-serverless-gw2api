import skills from '../mappings/skills.json'
import GW2ApiSkill from '../api/skills/skill'

export default class SkillsStore {
  normalize = (string: string): string =>
    string === undefined
      ? string
      : string
          .replace(/[^A-Za-z]/g, '')
          .toLowerCase()
          .trim()

  async find(ids: number[]): Promise<GW2ApiSkill[]> {
    // get a single skill from KV storage
    const getSkill = async (id: number): Promise<GW2ApiSkill> =>
      JSON.parse((await SKILLS.get(`${id}`)) || '')

    return Promise.all(ids.map((id) => getSkill(id)))
  }

  async findByName(names: string[]): Promise<GW2ApiSkill[]> {
    //TODO implement byName
    return (<GW2ApiSkill[]>skills).filter((skill: GW2ApiSkill) =>
      names.includes(this.normalize(skill.name)),
    )
  }
}
