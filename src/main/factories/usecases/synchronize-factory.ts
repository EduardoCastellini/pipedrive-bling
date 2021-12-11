import { SynchronizeService } from '../../../data/usescases/synchronize'
import { Synchronize } from '../../../domain/usecases/synchronize'

import { Pipedrive } from '../../../infra/http/pipedrive'
import { Bling } from '../../../infra/http/bling'
import { DealsMongoRepository } from '../../../infra/mongodb/deals/deals-mongo-repository'
import env from '../../config/env'
import { Builder } from '../../../infra/util/xml'

const { url, token } = env.pipedrive
const { blingUrl, apiKey } = env.bling

export const makeSynchronize = (): Synchronize => {
  const pipedrive = new Pipedrive(url, token)
  const dealsMongoRepository = new DealsMongoRepository()
  const bling = new Bling(blingUrl, apiKey)
  const xmlBuilder = new Builder()
  return new SynchronizeService(pipedrive, dealsMongoRepository, dealsMongoRepository, xmlBuilder, bling)
}
