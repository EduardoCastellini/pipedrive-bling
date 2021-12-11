import { AddDeals } from '../../domain/models/deals'

export interface AddDealsRepository{
  add: (dealsData: AddDeals) => Promise<void>
}
