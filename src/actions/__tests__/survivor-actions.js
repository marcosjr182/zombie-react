import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import ENV from '../../../src/env.json';
import { fetchSurvivor, reportSurvivor } from '../survivor-actions';

const middlewares = [ thunk ],
      mockStore = configureMockStore(middlewares),
      mockAdapter = new MockAdapter(axios);

const survivor = {
  name: 'Test',
  age: '10',
  gender: 'M',
  id: '12345',
  lonlat: 'POINT (5.0 35.0)',
  items: {
    Water: 0,
    Medication: 1,
    Food: 2,
    Ammunition: 3
  }
}
const mySurvivor = {...survivor, id: '31283261', name: 'mySurvivorTest'};

describe('Survivor component', () => {

  it('should be able to report', () => {
    mockAdapter.onPost(`${ENV.BASE_URL}/people/${survivor.id}/report_infection.json`)
      .reply(204);

    const expectedActions = [{ type: 'REPORT_INFECTED_SURVIVOR', payload: {}}],
          store = mockStore({ survivor: survivor });

    localStorage.setItem('my-survivor', JSON.stringify(mySurvivor))
    store.dispatch(reportSurvivor(survivor.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })

  })

})
