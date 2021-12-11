
import { LoadDeals } from '../../domain/usecases/load-deals'
import { ok, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoadDealsController implements Controller {
  constructor (private readonly loadDeals: LoadDeals) {}
  async handle (httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.loadDeals.load()
      return ok(result)
    } catch (error) {
      console.log('error: ', error)
      return serverError(error)
    }
  }
}
