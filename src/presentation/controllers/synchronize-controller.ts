import { Synchronize } from '../../domain/usecases/synchronize'
import { ok, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class SynchronizeController implements Controller {
  constructor (private readonly synchronize: Synchronize) {}

  async handle (httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.synchronize.sync()
      return ok(result)
    } catch (error) {
      console.log('error: ', error)
      return serverError(error)
    }
  }
}
