import { AddDealsRepository } from '../../../data/protocols/add-deals-repository'
import { FindDealsByDateRepository } from '../../../data/protocols/find-deals-by-date-repository'
import { LoadDealsRepository } from '../../../data/protocols/load-deals-repository'
import { UpdateDealsRepository } from '../../../data/protocols/update-deals-repository'
import { AddDeals } from '../../../domain/models/deals'
import { MongoHelper } from '../helpers/mongo-helper'

export class DealsMongoRepository implements AddDealsRepository, UpdateDealsRepository, FindDealsByDateRepository, LoadDealsRepository {
  async add (dealsData: AddDeals): Promise<void> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    await dealsCollection.insertOne(dealsData)
  }

  async update (_id, dealsData: AddDeals): Promise<void> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    await dealsCollection.updateOne({ _id }, { $set: dealsData })
  }

  async find (date: string): Promise<any> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    const deal = await dealsCollection.findOne({ date })
    return deal?._id ? deal : null
  }

  async loadAll (): Promise<any> {
    const dealsCollection = await MongoHelper.getCollection('deals')
    const deals = await dealsCollection.find().toArray()
    return deals
  }
}
