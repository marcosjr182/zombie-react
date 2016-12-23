import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import ENV from '../../../src/env.json';

const middlewares = [ thunk ],
      mockStore = configureMockStore(middlewares),
      mockAdapter = new MockAdapter(axios);


describe('Report actions', () => {

  it('should get an reports list', () => {
    //TODO
  })

})
