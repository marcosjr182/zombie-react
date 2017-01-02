import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ENV from '../../env.json';
import * as actions from '../raw';

const survivor = { name: 'Test' }

const rawSurvivorList = [Array(5)].map((_, id) => ({...survivor, id }))

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

  it('should be able to change its state', () => {
    const reducer = actions.default

    return expect(reducer([], actions.fetchSurvivorsAction(rawSurvivorList)))
      .toEqual(rawSurvivorList)
  })

})
