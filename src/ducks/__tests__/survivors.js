import * as actions from '../survivors'
import { resetItemsAction } from '../items'

const survivor = {
  id: '12345',
  name: 'TesteSurvivor',
  age: 21,
  gender: 'M'
}

const survivorList = [...Array(5)].map((_, i) => ({...survivor, id: i}))
const reducer = actions.default
const testAction = { type: 'TEST_ACTION', payload: survivor }

describe('Survivors actions', () => {

  it('should be able to pass a survivors list', () => {
    const dispatch = jest.fn()

    return actions.fetchSurvivorListPage(survivorList)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.fetchSurvivorListPageAction(survivorList)
        )
      )
  })

})

describe('Survivors reducer', () => {

  it('should be correctly initialized', () => {
    expect(reducer(undefined, testAction))
      .toEqual([])
  })

  it('should not receives a payload from an unknown action', () => {
    expect(reducer([], testAction))
    .toEqual([])
  })

  it('should be able to have a list of survivors', () => {
    expect(reducer([], actions.fetchSurvivorListPageAction(survivorList)))
      .toEqual(survivorList)
  })

})
