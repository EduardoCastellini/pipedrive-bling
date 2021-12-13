import { LoadDealsController } from './load-deals-controller'
import { ok, serverError } from '../helpers/http-helper'
import { LoadDeals } from '../../domain/usecases/load-deals'
import { DealsModel } from '../../domain/models/deals'
import { HttpRequest } from '../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
  }
})

const deal = {
  title: 'Deal Test',
  value: 100,
  status: 'won',
  org_name: 'Bruno S.A',
  won_time: '2021-12-11'
}

const makeFakeDelasModel = (): DealsModel => ({
  _id: 'ko975u3875395rrjf394385',
  date: '2021-12-11',
  deals: [deal],
  total: 1200
})

const makeLoadDeals = (): LoadDeals => {
  class LoadDealsStub implements LoadDeals {
    async load (): Promise<DealsModel[]> {
      return await new Promise(resolve => resolve([makeFakeDelasModel()]))
    }
  }
  return new LoadDealsStub()
}

interface sutTypes {
  sut: LoadDealsController
  loadDealsStub: LoadDeals
}

const makeSut = (): sutTypes => {
  const loadDealsStub = makeLoadDeals()
  const sut = new LoadDealsController(loadDealsStub)

  return {
    sut,
    loadDealsStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should return 500 if LoadDeals throws', async () => {
    const { sut, loadDealsStub } = makeSut()
    jest.spyOn(loadDealsStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponde = await sut.handle(makeFakeRequest())
    expect(httpResponde).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponde = await sut.handle(makeFakeRequest())
    expect(httpResponde).toEqual(ok([makeFakeDelasModel()]))
  })
})
