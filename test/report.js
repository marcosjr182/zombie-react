import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Report from '../src/components/report';

let wrapper;

describe('Test suite for Report', () => {
  beforeEach(() => {
    wrapper = shallow(<Report
                        description={'ReportName'}
                        value={'20%'} />);
  });

  it('Report should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the report information', () => {
    const report = wrapper.find('.report');
    expect(report.childAt(0).text()).to.equal('ReportName');
    expect(report.childAt(1).text()).to.equal('20%');
  });
})
