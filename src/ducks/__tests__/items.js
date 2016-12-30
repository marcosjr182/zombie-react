import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ENV from '../../env.json';
import * as actions from '../items';

import { survivor, raw_items, items } from '../../../test/mocks'

describe('Items actions', () => {

  it('should be able to fetch items for a survivor', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/people/${survivor.id}/properties.json`)
        .reply(200, raw_items)

    return actions.fetchItems(survivor.id)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.fetchItemsAction(survivor.id, raw_items)
        )
      )
  })

  it('should be able to empty items array', () => {
    return expect(actions.resetItems()).toEqual(actions.resetItemsAction())
  })

})


describe('Items reducer', () => {

  it('should be able to turn items into an empty object', () => {
    const reducer = actions.default
    const state = { [survivor.id]: items }

    expect(reducer(state, actions.resetItemsAction())).toEqual({})
  })

  it('should be able add items to a survivor id key', () => {
    const reducer = actions.default

    expect(reducer({}, actions.fetchItemsAction(survivor.id, items)))
      .toEqual({ [survivor.id]: items })
  })

})
