import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import { fetchSurvivor } from '../../src/actions/survivor-actions';

import ENV from '../../src/env.json';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const survivor = {
  name: 'Test',
  age: '10',
  gender: 'M',
  id: '12345',
  items: {
    Water: 0,
    Medication: 1,
    Food: 2,
    Ammunition: 3
  }
}

describe('Survivor actions', () => {

  it('should get an survivor', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onGet(`${ENV.BASE_URL}/people/${survivor.id}`)
      .reply(200, {
        data: { survivor }
      });

    const expectedActions = [{ type: 'FETCH_SURVIVOR', payload: survivor }],
          store = mockStore({ survivor: {}});

    store.dispatch(fetchSurvivor())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})
