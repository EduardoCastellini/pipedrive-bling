import { DealsModel } from '../../domain/models/deals'

export interface LoadDealsRepository {
  loadAll: () => Promise<DealsModel[]|null >
}
