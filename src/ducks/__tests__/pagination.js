import * as actions from '../pagination'

describe('Pagination actions', () => {

  it('should be able to change page to 5', () =>
    expect(actions.changePage(5))
      .toEqual(actions.changePageAction(5))
  )

  it('should be able to set pages qty to 10', () =>
    expect(actions.pagesQty(10))
      .toEqual(actions.pagesQty(10))
  )

})


describe('Pagination reducer', () => {

  it('should be able to change current page to 5', () => {
    const reducer = actions.default

    const state = { numberOfPages: 5, currentPage: 0 }
    const expectedState = { ...state, currentPage: 5 }

    return expect(reducer(state, actions.changePageAction(5)))
      .toEqual(expectedState)
  })

  it('should be able to change number of pages to 15', () => {
    const reducer = actions.default
    const state = { numberOfPages: 5, currentPage: 0 },
          expectedState = { ...state, numberOfPages: 15 }

    return expect(reducer(state, actions.pagesQtyAction(15)))
      .toEqual(expectedState)
  })

})
