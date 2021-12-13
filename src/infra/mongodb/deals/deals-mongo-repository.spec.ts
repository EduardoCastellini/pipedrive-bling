import { Collection } from 'mongodb'
import { DealsModel } from '../../../domain/models/deals'
import { MongoHelper } from '../helpers/mongo-helper'
import { DealsMongoRepository } from './deals-mongo-repository'

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : ''
let dealsCollection: Collection

const deal = {
  title: 'Deal Test',
  value: 100,
  status: 'won',
  org_name: 'Bruno S.A',
  won_time: '2021-12-11'
}

const makeFakeDealsData = (): DealsModel => (
  {
    _id: 'ko975u3875395rrjf394385',
    date: '2021-12-11',
    deals: [deal],
    total: 1200
  }
)

describe('Deal Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  beforeEach(async () => {
    dealsCollection = await MongoHelper.getCollection('deals')
    await dealsCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): DealsMongoRepository => {
    return new DealsMongoRepository()
  }

  test('Should add a deals on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeDealsData())
    const deals = await sut.loadAll()

    expect(deals).toBeTruthy()
    expect(deals).toEqual([makeFakeDealsData()])
  })

  test('Should find a deal on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeDealsData())
    const deals = await sut.find('2021-12-11')

    expect(deals).toBeTruthy()
    expect(deals).toEqual(makeFakeDealsData())
  })
})
