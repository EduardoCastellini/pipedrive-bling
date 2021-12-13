import { LoadDealsRepository } from '../protocols/load-deals-repository'
import { DealsModel } from '../../domain/models/deals'
import { DbLoadDeals } from './db-load-deals'

const deal = {
  title: 'Deal Test',
  value: 100,
  status: 'won',
  org_name: 'Bruno S.A',
  won_time: '2021-12-11'
}

const makeFakeDealsData = (): DealsModel[] => ([
  {
    _id: 'ko975u3875395rrjf394385',
    date: '2021-12-11',
    deals: [deal],
    total: 1200
  }
])

const makeLoadDealsRepository = (): LoadDealsRepository => {
  class LoadDealsRepositoryStub implements LoadDealsRepository {
    async loadAll (): Promise<DealsModel[]> {
      return await new Promise(resolve => resolve(makeFakeDealsData()))
    }
  }
  return new LoadDealsRepositoryStub()
}

interface SutTypes {
  sut: DbLoadDeals
  loadDealsRepository: LoadDealsRepository
}

const makeSut = (): SutTypes => {
  const loadDealsRepository = makeLoadDealsRepository()
  const sut = new DbLoadDeals(loadDealsRepository)

  return {
    sut,
    loadDealsRepository
  }
}

describe('DbLoadDeals UseCase', () => {
  test('Should loadDealsRepository return correct values', async () => {
    const { sut } = makeSut()
    const result = await sut.load()
    expect(result).toMatchObject(makeFakeDealsData())
  })
  test('Should call loadDealsRepository with correct values', async () => {
    const { sut, loadDealsRepository } = makeSut()
    const addSpy = jest.spyOn(loadDealsRepository, 'loadAll')
    await sut.load()
    expect(addSpy).toHaveBeenCalledWith()
  })

  test('Should throws if loadDealsRepository throws', async () => {
    const { sut, loadDealsRepository } = makeSut()
    jest.spyOn(loadDealsRepository, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promisse = sut.load()
    await expect(promisse).rejects.toThrow()
  })
})
