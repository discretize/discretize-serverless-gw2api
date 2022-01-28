import items from '../mappings/items.json'
import GW2ApiItem from '../api/items/item'

export default class TraitsStore {
  normalize = (string: string): string =>
    string === undefined
      ? string
      : string
          .replace(/[^A-Za-z]/g, '')
          .toLowerCase()
          .trim()

  async all(): Promise<GW2ApiItem[]> {
    return <GW2ApiItem[]>items
  }

  async find(ids: number[]): Promise<GW2ApiItem[]> {
    return (<GW2ApiItem[]>items).filter((item: GW2ApiItem) =>
      ids.includes(item.id),
    )
  }

  async findByName(names: string[]): Promise<GW2ApiItem[]> {
    return (<GW2ApiItem[]>items).filter((item: GW2ApiItem) =>
      names.includes(this.normalize(item.name)),
    )
  }
}
