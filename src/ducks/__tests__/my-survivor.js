import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import ENV from '../../env.json'
import * as actions from '../my-survivor'
import { tradeItemsAction } from '../survivor'

const survivor = {
  id: '12345',
  name: 'TesteSurvivor',
  age: 21,
  gender: 'M'
}

describe('MySurvivor actions', () => {

  it('should be able to sign in', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor)

    return actions.signIn(survivor.id)(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.signInAction(survivor)
        )
      })
  })

  it('should be able to sign out', () => {
    expect(actions.signOut()).toEqual(actions.signOutAction())
  })

  it('should be fail to sign in as an unknown survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(404)

    return actions.signIn(survivor.id)(dispatch).then( () =>
      expect(dispatch).toBeCalledWith(actions.signInFailedAction(
        new Error('Request failed with status code 404')
      ))
    )
  })

  it('should be able to update his information', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const lonlat = "POINT (5.0 0.5)"
    const survivor = { ...survivor, lonlat }

    mockAdapter
      .onPatch(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor);

    return actions.updateUser(survivor)(dispatch)
      .then(() =>{
        expect(dispatch).toBeCalledWith(
          actions.updateUserAction(survivor)
        )
      }
      )
  })

})

describe('Survivor reducer', () => {

  it('should be able to have a survivor', () => {
    const reducer = actions.default

    expect(reducer({}, actions.addSurvivorAction(survivor)))
      .toEqual(survivor)

    expect(reducer({}, actions.updateUserAction(survivor)))
      .toEqual(survivor)

    expect(reducer({}, actions.signInAction(survivor)))
      .toEqual(survivor)
  })

  it('should have not a survivor after sign out', () => {
    const reducer = actions.default
    expect(reducer(survivor, actions.signOutAction(survivor)))
      .toEqual({})
  })

  it('should be able to have a survivor from a trade', () => {
    const reducer = actions.default
    const mySurvivor = { ...survivor, id: '989898' }
    const tradeResponse = { survivor, mySurvivor }

    expect(reducer({}, tradeItemsAction(tradeResponse)))
      .toEqual(mySurvivor)
  })

})
