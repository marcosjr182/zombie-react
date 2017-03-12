import reducer from '../is-signed'
import { signInAction, signOutAction } from '../my-survivor'

const testAction = { type: 'TEST_ACTION', payload: 12345 }

describe('isSigned reducer', () => {

  beforeAll(() => localStorage.clear())

  it('should be correctly initialized having there is no user saved', () => {
    expect(reducer(undefined, testAction))
    .toEqual(false)
  })

  it('should not receives a payload from an unknown action', () => {
    expect(reducer({}, testAction))
    .toEqual({})
  })

  it('should turn false with signOutAction', () =>
    expect(reducer(true, signOutAction()))
      .toEqual(false)
  )

  it('should turn true with signInAction', () =>
    expect(reducer(false, signInAction()))
      .toEqual(true)
  )

})
