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

  async all(): Promise<GW2ApiSkill[]> {
    return <GW2ApiSkill[]>skills
  }

  async find(ids: number[]): Promise<GW2ApiSkill[]> {
    return (<GW2ApiSkill[]>skills).filter((skill: GW2ApiSkill) =>
      ids.includes(skill.id),
    )
  }

  async findByName(names: string[]): Promise<GW2ApiSkill[]> {
    return (<GW2ApiSkill[]>skills).filter((skill: GW2ApiSkill) =>
      names.includes(this.normalize(skill.name)),
    )
  }
}
