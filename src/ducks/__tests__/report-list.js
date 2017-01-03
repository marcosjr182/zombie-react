import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ENV from '../../env.json';
import * as actions from '../report-list'

const reports = [
  `${ENV.BASE_URL}/report_name_1.json`,
  `${ENV.BASE_URL}/report_name_2.json`,
  `${ENV.BASE_URL}/report_name_3.json`
]

const reducer = actions.default
const testAction = { type: 'TEST_ACTION', payload: reports }

describe('Report list actions', () => {

  it('should be able to fetch a list of reports', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)

    mockAdapter
      .onGet(`${ENV.BASE_URL}/report.json`)
        .reply(200, reports)

    return actions.fetchReportList()(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(actions.fetchReportListAction(reports))
      )
  })

})

describe('Report list reducer', () => {

  it('should be correctly initialized', () => {
    expect(reducer(undefined, testAction))
      .toEqual([])
  })

  it('should not receives a payload from an unknown action', () => {
    expect(reducer([], testAction))
    .toEqual([])
  })

  it('should be able to have an array of reports', () => {
    expect(reducer([], actions.fetchReportListAction(reports)))
      .toEqual(reports)
  })

})
