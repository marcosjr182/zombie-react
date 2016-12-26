import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import sinon from 'sinon';

import ENV from '../../../src/env.json';
import * as actions from '../survivor-actions';
import { rawSurvivorList, survivor, survivorList, mySurvivor, raw_items } from '../../../test/mocks'

const mockAdapter = new MockAdapter(axios);
const dispatch = jest.fn();

describe('Survivor actions', () => {

  afterEach(() =>
    mockAdapter.restore()
  )

  it('should be able to sign in', () => {
    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor)
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}/properties.json`)
        .reply(200, raw_items);

    actions.signIn(survivor.id)(dispatch).then(() =>
      expect(dispatch)
        .toBeCalledWith(actions.fetchItemsAndDispatch(survivor, actions.SIGN_IN))
    )
  });

  it('should be fail to sign in as an unknown survivor', () => {
    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(404)

    actions.signIn(survivor.id)(dispatch).then( () =>
      expect(dispatch).toBeCalledWith(actions.signInFailedAction())
    )
  });

  it('should be able to asdsadad', () => {
    expect(actions.signInFailedAction()).toEqual({
      type: actions.SIGN_IN_FAILED
    })
  });


  it('should be able to sign out', () => {
    expect(actions.signOut()).toEqual({
      type: actions.SIGN_OUT,
      payload: {}
    })
  });

  it('should be able to update his location', () => {
    mockAdapter
      .onGet(actions.GET_LOCATION_URL)
        .reply(200, { location: {lat: 10, lng: 80} })
      .onPatch(`${ENV.BASE_URL}/people/${survivor.id}.json`)
        .reply(200, survivor);

    actions.updateLocation(survivor)(dispatch)
      .then(() => expect(dispatch).toBeCalledWith(
        actions.fetchItemsAndDispatch(survivor, actions.UPDATE_LOCATION)
      ))
  });

  it('should be able to fetch a survivor', () => {
    mockAdapter.onGet(`${ENV.BASE_URL}/people/${survivor.id}.json`)
      .reply(200, survivor);

    actions.fetchSurvivor(survivor.id)(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.fetchItemsAndDispatch(survivor, actions.FETCH_SURVIVOR)
        )
      })
  });

  it('should be able to report a survivor', () => {
    mockAdapter
      .onPost(`${ENV.BASE_URL}/people/${survivor.id}/report_infection.json`)
        .reply(204);

    localStorage.setItem('my-survivor', JSON.stringify(mySurvivor))

    actions.reportSurvivor(survivor.id)(dispatch)
      .then(() =>
        expect(dispatch)
          .toBeCalledWith(actions.reportInfectedSurviorAction())
      )
  });

  it('should be able to prepare a SurvivorList page', () => {
    mockAdapter.onGet(`${ENV.BASE_URL}/people/${survivor.id}/properties.json`)
      .reply(204, raw_items);

    actions.prepareSurvivorListPage(survivorList, 0)(dispatch)
      .then(
        () => expect(dispatch.mock.calls.length).toEqual(survivorList.length),
        err => console.log(err)
      )
  });

  it('should be able to fetch a survivors list', () => {
    mockAdapter
      .onGet(`${ENV.BASE_URL}/people.json`)
        .reply(200, rawSurvivorList)
      .onGet(`${ENV.BASE_URL}/people/456.json`)
        .reply(200, raw_items);

    actions.fetchSurvivors()(dispatch)
      .then(
        () => expect(dispatch).toBeCalledWith(actions.fetchSurvivorsAction()),
        err => console.log(err)
      )
  });

})
