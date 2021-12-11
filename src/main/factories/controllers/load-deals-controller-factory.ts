import { Controller } from '../../../presentation/protocols'
import { LoadDealsController } from '../../../presentation/controllers/load-deals-controller'
import { DealsMongoRepository } from '../../../infra/mongodb/deals/deals-mongo-repository'
import { DbLoadDeals } from '../../../data/usescases/db-load-deals'

export const makeLoadDealsController = (): Controller => {
  const dealsMongoRepository = new DealsMongoRepository()
  const loadDeals = new DbLoadDeals(dealsMongoRepository)
  const controller = new LoadDealsController(loadDeals)
  return controller
}
