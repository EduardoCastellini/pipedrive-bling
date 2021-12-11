import { AddDealsRepository } from '../../../data/protocols/add-deals-repository'
import { FindDealsByDateRepository } from '../../../data/protocols/find-deals-by-date-repository'
import { LoadDealsRepository } from '../../../data/protocols/load-deals-repository'
import { AddDeals, DealsModel } from '../../../domain/models/deals'
import { MongoHelper } from '../helpers/mongo-helper'

export class DealsMongoRepository implements AddDealsRepository, FindDealsByDateRepository, LoadDealsRepository {
  async add (dealsData: AddDeals): Promise<void> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    await dealsCollection.insertOne(dealsData)
  }

  async find (date: string): Promise<any> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    const deals = await dealsCollection.findOne({ date })
    return deals?._id ? deals : null
  }

  async loadAll (): Promise<DealsModel[]|null > {
    const dealsCollection = await MongoHelper.getCollection('deals')
    const deals: DealsModel[]|null = await dealsCollection.find().toArray()
    return deals
  }
}
