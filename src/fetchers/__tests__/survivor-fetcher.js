import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import { shallowWithStore } from 'enzyme-redux';

import ENV from '../../../src/env.json';
import SurvivorFetcher from '../survivor-fetcher';

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
};

const middlewares = [ thunk ],
      mockStore = configureMockStore(middlewares),
      mockAdapter = new MockAdapter(axios),
      store = mockStore({ survivor: {} }),
      wrapper = shallowWithStore(<SurvivorFetcher id={survivor.id} />, store);

describe('Survivor fetcher', () => {

  it('should get an survivor', () => {
    //TODO
  })

})
