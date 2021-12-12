import { AddDeals } from '../../domain/models/deals'

export interface UpdateDealsRepository {
  update: (_id: string, dealsData: AddDeals) => Promise<void>
}
