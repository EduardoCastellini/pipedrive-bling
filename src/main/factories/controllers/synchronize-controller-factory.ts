import { Controller } from '../../../presentation/protocols'
import { SynchronizeController } from '../../../presentation/controllers/synchronize-controller'
import { makeSynchronize } from '../../factories/usecases/synchronize-factory'

export const makeSynchronizeController = (): Controller => {
  const controller = new SynchronizeController(makeSynchronize())
  return controller
}
