import GW2ApiTrait from '../api/traits/trait'
import traits from '../mappings/traits.json'

export default class TraitsStore {
  normalize = (string: string): string =>
    string === undefined
      ? string
      : string
          .replace(/[^A-Za-z]/g, '')
          .toLowerCase()
          .trim()

  async all(): Promise<GW2ApiTrait[]> {
    return <GW2ApiTrait[]>traits
  }

  async find(ids: number[]): Promise<GW2ApiTrait[]> {
    return (<GW2ApiTrait[]>traits).filter((trait: GW2ApiTrait) =>
      ids.includes(trait.id),
    )
  }

  async findByName(names: string[]): Promise<GW2ApiTrait[]> {
    return (<GW2ApiTrait[]>traits).filter((trait: GW2ApiTrait) =>
      names.includes(this.normalize(trait.name)),
    )
  }
}
