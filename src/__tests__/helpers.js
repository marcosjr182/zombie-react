import * as helpers from '../helpers'

describe('helpers', () => {

  it('should be able to transform items into an api-friendly string', () => {
    const items = { Water: 0, Food: 1, Ammunition: 2, Medication: 3 }
    const expectedString = 'Water:0;Food:1;Ammunition:2;Medication:3;'
    expect(helpers.stringifyItems(items))
      .toEqual(expectedString)
  })

  it('should be able to parse a location from POINT to LatLng', () => {
    const lonlat = 'POINT (4.5 3.5)'
    const expectedObject = { lat: 4.5, lng: 3.5 }

    expect(helpers.parseLocation(lonlat))
      .toEqual(expectedObject)
  })

  it('should be able to return a default location if user has no lonlat', () => {
    const expectedObject = { lat: 0, lng: 0 }

    expect(helpers.parseLocation(''))
      .toEqual(expectedObject)
  })

  it('should be able to transform a LatLng into POINT', () => {
    const lastSeen = { lat: 4.5, lng: 3.5 }
    const expectedString = 'POINT (4.5 3.5)'

    expect(helpers.toPoint(lastSeen))
      .toEqual(expectedString)
  })

})
