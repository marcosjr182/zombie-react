import reducer from '../is-signed'
import { signInAction, signOutAction } from '../my-survivor'

describe('isSigned reducer', () => {

  it('should turn false with signOutAction', () =>
    expect(reducer(true, signOutAction()))
      .toEqual(false)
  )

  it('should turn true with signInAction', () =>
    expect(reducer(false, signInAction()))
      .toEqual(true)
  )

})
