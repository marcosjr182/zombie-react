import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//import moxios from 'moxios';

import ENV from '../../../src/env.json';
import * as actions from '../survivor-actions';

import { rawSurvivorList, survivor, survivorList, mySurvivor, raw_items, items } from '../../../test/mocks'

describe('Survivor actions', () => {

  // afterEach(() => {
  //   dispatch = jest.fn();
  //   mockAdapter = new MockAdapter(axios.create())
  // })

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

  it('should have a signInFailedAction', () => {
    expect(actions.signInFailedAction()).toEqual({
      type: actions.SIGN_IN_FAILED
    })
  })

  it('should be able to sign out', () => {
    expect(actions.signOut()).toEqual({
      type: actions.SIGN_OUT,
      payload: {}
    })
  })

  it('should be able to update his location', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const location = {lat: 10, lng: 80}

    mockAdapter
      .onPatch(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor);

    return actions.updateLocation(survivor, location)(dispatch)
      .then(() =>{
        expect(dispatch).toBeCalledWith(
          actions.updateLocationAction(survivor)
        )
      }
      )
  });
  it('should be able to retrieve his location', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const location = {lat: 10, lng: 80}

    mockAdapter
      .onPost(actions.GET_LOCATION_URL)
        .reply(200, { location })

    return actions.retrieveLocation()(dispatch)
      .then(() =>{
        expect(dispatch).toBeCalledWith(
          actions.retrieveLocationAction({ location })
        )
      }
      )
  });



  it('should be able to fetch a survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter.onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
      .reply(200, survivor);

    return actions.fetchSurvivor(survivor.id)(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.fetchSurvivorAction(survivor)
        )
      })
  });

  it('should be able to report a survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onPost(`${ENV.BASE_URL}/people/${mySurvivor.id}/report_infection.json`)
        .reply(204);

    localStorage.setItem('my-survivor', JSON.stringify(mySurvivor))

    return actions.reportSurvivor(survivor.id)(dispatch)
      .then(() =>
        expect(dispatch)
          .toBeCalledWith(actions.reportInfectedSurviorAction())
      )
  });

  it('should be able to prepare a SurvivorList page', () => {
    // mockAdapter
    //   .onGet(`${ENV.BASE_URL}/people/${survivor.id}/properties.json`)
    //     .reply(204, raw_items);
    //
    // actions.prepareSurvivorListPage(survivorList, 0)(dispatch)
    //   .then(
    //     () => expect(dispatch.mock.calls.length).toEqual(survivorList.length),
    //     err => console.log(err)
    //   )
  });

  it('should be able to fetch a survivors list', () => {
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
  });

  it('should be able to add a new survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onPost(`${ENV.BASE_URL}/people.json`)
        .reply(201, survivor)
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor)

    return actions.addSurvivor(survivor)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(actions.addSurvivorAction())
      )
  })


})
