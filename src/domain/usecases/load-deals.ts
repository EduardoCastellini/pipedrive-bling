import { DealsModel } from '../models/deals'

export interface LoadDeals {
  load: () => Promise<DealsModel[]>
}
