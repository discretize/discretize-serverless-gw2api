import GW2ApiFact from './fact'

interface GW2ApiTraitedFact {
  // TODO reattach extends GW2piFact
  requires_trait: number
  overrides?: number
}

export default GW2ApiTraitedFact
