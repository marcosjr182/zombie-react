import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ENV from '../../env.json';
import * as actions from '../raw';

const survivor = { name: 'Test' }
const rawSurvivorList = [Array(5)].map((_, id) => ({...survivor, id }))

const reducer = actions.default
const testAction = { type: 'TEST_ACTION', payload: survivor }

describe('raw actions', () => {

  it('should be able to fetch a list of survivors', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/people.json`)
        .reply(200, rawSurvivorList)

    return actions.fetchSurvivors()(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.fetchSurvivorsAction(rawSurvivorList)
        )
      )
  })

})

describe('raw reducer', () => {

  it('should be correctly initialized', () => {
    expect(reducer(undefined, testAction))
      .toEqual([])
  })

  it('should not receives a payload from an unknown action', () => {
    expect(reducer([], testAction))
    .toEqual([])
  })

  it('should be able to change its state', () => {
    return expect(reducer([], actions.fetchSurvivorsAction(rawSurvivorList)))
      .toEqual(rawSurvivorList)
  })

})
