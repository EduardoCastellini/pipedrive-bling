import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadDealsController } from '../factories/controllers/load-deals-controller-factory'

export default (router: Router): void => {
  router.get('/deals', adaptRoute(makeLoadDealsController()))
}
