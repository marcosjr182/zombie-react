import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import ENV from '../../env.json'
import * as actions from '../survivor'

const reducer = actions.default
const testAction = { type: 'TEST_ACTION', payload: survivor }

const survivor = {
  id: '12345',
  name: 'TesteSurvivor',
  age: 21,
  gender: 'M'
}

const tradeResponse = {
  survivor,
  mySurvivor: { ...survivor, id: '5436'}
}

describe('Survivor actions', () => {

  it('should be able to fetch a survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor)

    return actions.fetchSurvivor(survivor.id)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.fetchSurvivorAction(survivor)
        )
      )
  })

  it('should be able to offer a trade', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    const tradeUrl = `${ENV.BASE_URL}/people/${survivor.id}/properties/trade_item.json`


    const tradeData = {
      consumer: {
        pick: 'Water:5;Food:3;',
        payment: 'Food:5;Water:3;',
        name: survivor.name
      }
    }

    mockAdapter
      .onPost(tradeUrl, tradeData)
        .reply(200, tradeResponse)

    return actions.offerTrade(survivor.id, tradeData)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.tradeItemsAction(tradeResponse)
        )
      )
  })

})

describe('Survivor reducer', () => {

  it('should be correctly initialized', () => {
    expect(reducer(undefined, testAction))
      .toEqual({})
  })

  it('should not receives a payload from an unknown action', () => {
    expect(reducer({}, testAction))
    .toEqual({})
  })

  it('should be able to have a survivor', () => {
    expect(reducer({}, actions.fetchSurvivorAction(survivor)))
      .toEqual(survivor)
  })

  it('should be able to have a survivor from a trade', () => {
    expect(reducer({}, actions.tradeItemsAction(tradeResponse)))
      .toEqual(survivor)
  })

})
