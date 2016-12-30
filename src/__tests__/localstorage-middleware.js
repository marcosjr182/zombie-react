import { localstorageMiddleware } from '../store'
import { localStorageResolver } from '../helpers'
import { signInAction } from '../ducks/my-survivor'

//import { rawSurvivorList, survivor, survivorList, mySurvivor, raw_items, items } from '../../../test/mocks'


describe('localstorageMiddleware ', () => {

  it('should be able to intercept SIGN_IN', () => {
    const next = (a) => a
    survivor = { name: 'Test' }
    const action = localstorageMiddleware(localStorageResolver('SIGN_IN'))
    expect(action).toEqual(signInAction(survivor))
  })

})
