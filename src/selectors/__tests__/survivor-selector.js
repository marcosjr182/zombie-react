import * as selector from '../survivor-selector'

const survivor = {
  name: 'Test',
  id: '123456',
  gender: 'M',
  age: 10,
  lonlat: 'POINT (5.0 35.0)',
  lastSeen: { lat: 5.0, lng: 35.0 },
  items: { Water: 5, Food: 3, Ammunition: 0 }
}

describe('Survivor selectors', () => {

  it('should be able to parse a survivor data', () => {
    const survivor = { ...survivor, lonlat: 'POINT (10.0 5.5)' }
    const expectedSurvivor = { ...survivor, lastSeen: { lat: 10.0, lng: 5.5 }}

    expect(selector.parseSurvivor(survivor))
      .toEqual(expectedSurvivor)
  })

  it('should be able to parse raw items data', () => {
    const itemNames = ['Water', 'Food', 'Ammunition', 'Medication']
    const raw_items = itemNames.map((name, i) => ({
      quantity: i,
      item: { name: name }
    }))

    const expectedItems = { Water: 0, Food: 1, Ammunition: 2, Medication: 3}
    expect(selector.parseItems(raw_items))
      .toEqual(expectedItems)
  })


  it('should be able to reduce a survivor to an acceptable request', () => {

    const expectedSurvivor = {
      person: {
        name: survivor.name,
        age: survivor.age,
        gender: survivor.gender,
        lonlat: survivor.lonlat
      }
    }

    expect(selector.updatableSurvivor(survivor))
      .toEqual(expectedSurvivor)
  })

  it('should be able to correctly calculate the distance between points', () => {
    const origin = { lat: 1, lng: 1 }
    const destination = { lat: 1, lng: 2 }

    const expectedDistance = '111' // km
    expect(selector.calculateDistance(origin, destination))
      .toEqual(expectedDistance)
  })

  it('should be able to get survivor from a state by using his id', () => {
    const state = {
      survivors: [
        survivor,
        { ...survivor, id: 'aa112233' },
        { ...survivor, id: 'bb112233' }
      ]
    }

    expect(selector.getSurvivorById(state, survivor.id))
      .toEqual(survivor)
  })


})
