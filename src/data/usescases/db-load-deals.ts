import { DealsModel } from '../../domain/models/deals'
import { LoadDeals } from '../../domain/usecases/load-deals'
import { LoadDealsRepository } from '../protocols/load-deals-repository'

export class DbLoadDeals implements LoadDeals {
  constructor (private readonly loadDealsRepository: LoadDealsRepository) {}

  async load (): Promise<DealsModel[]|null> {
    const deals = await this.loadDealsRepository.loadAll()
    return deals
  }
}
