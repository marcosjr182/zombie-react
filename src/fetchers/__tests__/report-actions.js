import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import ENV from '../../../src/env.json';
import { fetchReports, fetchReportList } from '../report-actions';

const middlewares = [ thunk ],
      mockStore = configureMockStore(middlewares),
      mockAdapter = new MockAdapter(axios);

const report_list = [

]

describe('Report actions', () => {

  it('should get an reports list', () => {
    mockAdapter.onGet(`${ENV.BASE_URL}/report.json`)
      .reply(200, {
        data: { survivor }
      });

    const expectedActions = [{ type: 'FETCH_REPORT_LIST', payload: report_list }],
          store = mockStore({ survivor: {}});

    store.dispatch(fetchSurvivor())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

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
