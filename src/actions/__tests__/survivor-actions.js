import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ENV from '../../env.json';
import * as actions from '../survivor-actions';

import { GET_LOCATION_URL } from '../../api'
const survivor = { name: 'TestSurvivor', id: '567' }

describe('Survivor 0 actions', () => {

  it('should be able to report an infected survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const infectedId = '989'
    const data = new FormData().append('infected', infectedId)

    mockAdapter
      .onPost(`${ENV.BASE_URL}/people/${survivor.id}/report_infection.json`, data)
        .reply(200, data)

    return actions.reportInfectedSurvivor(survivor.id, data)(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.reportInfectedSurvivorAction()
        )
      })
  })

  it('should be able to retrieve user location', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const response = { location: { lat: 10, lng: -10 }}

    mockAdapter
      .onPost(GET_LOCATION_URL)
        .reply(200, response)

    return actions.retrieveLocation()(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.retrieveLocationAction(response)
        )
      })
  })

  it('should be able to correctly update user location', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const response = { location: { lat: 10, lng: -10 }}
    const expectedLonlat = 'POINT (10 -10)'

    mockAdapter
      .onPost(GET_LOCATION_URL)
        .reply(200, response)

    return actions.updateLocation(survivor)(dispatch)
      .then(() => {
        expect(dispatch).toBeCalledWith(
          actions.updateUserAction({ ...survivor, lonlat: expectedLonlat })
        )
      })
  })


})
