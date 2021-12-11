import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSynchronizeController } from '../factories/controllers/synchronize-controller-factory'

export default (router: Router): void => {
  router.post('/synchronize', adaptRoute(makeSynchronizeController()))
}
