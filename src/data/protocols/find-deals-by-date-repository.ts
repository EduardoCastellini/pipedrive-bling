import { DealsModel } from '../../domain/models/deals'

export interface FindDealsByDateRepository{
  find: (date: string) => Promise<DealsModel|null>
}
