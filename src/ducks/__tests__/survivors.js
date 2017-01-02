import * as actions from '../survivors'

const survivor = {
  id: '12345',
  name: 'TesteSurvivor',
  age: 21,
  gender: 'M'
}

const survivorList = [...Array(5)].map((_, i) => ({...survivor, id: i}))

describe('Survivors actions', () => {

  it('should be able to pass a survivors list', () => {
    expect(actions.fetchSurvivorListPage(survivorList))
      .toEqual(actions.fetchSurvivorListPageAction(survivorList))
  })

})

describe('Survivor reducer', () => {

  it('should be able to have a list of survivors', () => {
    const reducer = actions.default

    expect(reducer([], actions.fetchSurvivorListPageAction(survivorList)))
      .toEqual(survivorList)
  })

})
