import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Report from '../report';

const report_info = {
  description: 'ReportDescription',
  average_of_tests: 10
}

const wrapper = shallow(<Report report={report_info} />);

describe('Report component', () => {
  it('should render info correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
