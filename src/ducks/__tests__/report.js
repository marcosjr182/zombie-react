import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import ENV from '../../env.json'
import * as actions from '../report'

const report = {
  description: 'Report test',
  average_result: 55.77
}

describe('Report actions', () => {

  it('should be able to fetch a report', () => {
    const dispatch = jest.fn()
    const mockAdapter = new MockAdapter(axios)
    const reportLocation = `${ENV.BASE_URL}/reports/test_report.json`

    mockAdapter
      .onGet(reportLocation)
        .reply(200, { report })

    return actions.fetchReport(reportLocation)(dispatch)
      .then(() =>
        expect(dispatch).toBeCalledWith(
          actions.fetchReportAction(report)
        )
      )
  })

})

describe('Report reducer', () => {

  it('should be able to have an array of reports', () => {
    const reducer = actions.default
    const expectedState = [ report ]

    expect(reducer([], actions.fetchReportAction(report)))
      .toEqual(expectedState)
  })

})
