import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import ENV from '../../../src/env.json';
import { fetchReports, fetchReportList } from '../report-actions';
import SurvivorFetcher from '../survivor-fetcher';

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



describe('Survivor fetcher', () => {

  it('should get an survivor', () => {
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
